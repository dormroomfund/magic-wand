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

    const drive = await this.getDriveClient();

    /* Get the parent folder we want to store the company's document folder in. */
    const teamParentFolder = config.get(
      `googleDrive.teamFolderIds.${company.team}`
    );

    const createDriveFile = util.promisify(drive.files.create);
    const copyDriveFile = util.promisify(drive.files.copy);

    /* Create the companies folder if it hasn't been created before */
    let companyFolder;
    if (company.googleFolderId) {
      companyFolder = company.googleFolderId;
    } else {
      try {
        const res = await createDriveFile({
          supportTeamDrives: true,
          resource: {
            name: company.name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [teamParentFolder],
          },
          fields: 'id',
        });

        companyFolder = res.data.id;
      } catch (e) {
        logger.error('error while creating folder', e);
        throw new errors.BadRequest('Google Drive Folder Error');
      }
    }

    const documentName = `${company.name} ${documentType.toUpperCase()}`;

    const templateId = config.get(`googleDrive.templateIds.${documentType}`);

    try {
      const res = await copyDriveFile({
        supportsTeamDrives: true,
        fileId: templateId,
        resource: {
          name: documentName,
          parents: [companyFolder],
        },
      });

      return {
        ...data,
        documentId: res.data.id,
        googleFolderId: companyFolder,
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
