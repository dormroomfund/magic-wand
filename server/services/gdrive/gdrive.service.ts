/*
 * Service for managing all google drive api workflow specifically generating
 * snapshots or prevote documents.
 *
 * {
 *   documentType: 'prevote' or 'snapshot'
 *   companyId:
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

  /**
   * Creates a google drive client for usage.
   */
  private getDriveClient = async () => {
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
  };

  async create(data: GoogleDriveDocument) {
    const { documentType, companyId } = data;
    const company = await this.app.service('api/companies').get(companyId);

    if (company.companyLinks.some(({ name }) => name === documentType)) {
      return data;
    }
    if (!company.team) {
      throw new errors.Unprocessable('company has no assigned team');
    }

    /* Get the relevant folder we want to store this document in. */
    const folder = config.get(
      `googleDrive.${documentType}FolderIds.${company.team}`
    );

    const documentName = `[${companyId}] ${
      company.name
    } ${documentType.toUpperCase()}`;

    const drive = await this.getDriveClient();
    const createDriveFile = util.promisify(drive.files.create);

    try {
      const res = await createDriveFile({
        supportsTeamDrives: true,
        resource: {
          name: documentName,
          mimeType: 'application/vnd.google-apps.document',
          parents: [folder],
        },
      });

      return {
        ...data,
        documentId: res.data.id,
      };
    } catch (e) {
      logger.error('error while creating file', e);
      throw new errors.BadRequest('Google Drive File Error');
    }
  }
}

export default (app: App) => {
  app.use('/api/gdrive', new GDriveService());
  app.service('api/gdrive').hooks(hooks);
};
