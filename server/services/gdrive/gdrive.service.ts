/*
 * Service for managing all google drive api workflow specifically generating
 * snapshots or prevote documents.
 *
 * {
 *   document_type: 'prevote' or 'snapshot'
 *   company_id:
 * }
 *
 * See: http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
 */
import errors from '@feathersjs/errors';
import config from 'config';
import { google } from 'googleapis';
import util from 'util';
import App from '../../../client/schemas/app';
import { Company } from '../../../client/schemas/company';
import { GoogleDriveDocument } from '../../../client/schemas/gdrive';
import logger from '../../logger';
import hooks from './gdrive.hooks';

const cfg: Record<string, string> = config.get('googleDrive');

class GDriveService {
  private app!: App;

  setup(app) {
    this.app = app;
  }

  private async getDriveClient() {
    /* Create and authenticate the jwt client. */
    const jwtClient = new google.auth.JWT(
      cfg.googleServiceEmail,
      null,
      cfg.googleServiceKey,
      ['https://www.googleapis.com/auth/drive']
    );

    try {
      await jwtClient.authorize();
    } catch (e) {
      logger.error('error while authorizing google drive client', e);
      throw new errors.GeneralError('Google Drive Authentication Error');
    }

    const drive = google.drive({
      version: 'v3',
      auth: jwtClient,
    });

    return drive;
  }

  async create(data: GoogleDriveDocument) {
    const { document_type, company_id } = data;
    let company: Company;
    try {
      company = await this.app.service('api/companies').get(company_id);
    } catch (e) {
      if (e.className !== 'not-found') {
        throw new errors.BadRequest(`company with id ${company_id} not found`);
      }
      throw e;
    }

    if (company.company_links.some(({ name }) => name === document_type)) {
      return data;
    }
    if (!company.team) {
      throw new errors.Unprocessable('company has no assigned team');
    }

    /* Get the relevant folder we want to store this document in. */
    const folder = config.get(
      `googleDrive.${document_type}FolderIds.${company.team}`
    );

    const documentName = `[${company_id}] ${
      company.name
    } ${document_type.toUpperCase()}`;

    const drive = await this.getDriveClient();
    const createDriveFile = util.promisify(drive.files.create);

    let res;
    try {
      res = await createDriveFile({
        supportsTeamDrives: true,
        resource: {
          name: documentName,
          mimeType: 'application/vnd.google-apps.document',
          parents: [folder],
        },
      });
    } catch (e) {
      logger.error('error while creating file', e);
      throw new errors.BadRequest('Google Drive File Error');
    }

    return {
      ...data,
      document_id: res.data.id,
    };
  }
}

export default (app: App) => {
  app.use('/api/gdrive', new GDriveService());
  app.service('api/gdrive').hooks(hooks);
};
