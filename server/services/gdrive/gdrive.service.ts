/*
 * Service for managing all google drive api workflow specifically generating
 * snapshots or prevote documents.
 *
 * {
 *   document_type: 'prevote' or 'snapshot' or 'both'
 *   company_id:
 * }
 *
 * See: http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
 */
import errors from '@feathersjs/errors';
import config from 'config';
import { google } from 'googleapis';
import App from '../../../client/schemas/app';
import { DocumentTypes } from '../../../client/schemas/gdrive';
import hooks from './gdrive.hooks';
import logger from '../../logger';

class GDriveService {
  private app!: App;

  setup(app) {
    this.app = app;
  }

  async create(data) {
    /*
     * Get the documents we need to create
     */
    let toCreate: Array<DocumentTypes>;
    if (data.document_type === DocumentTypes.Both) {
      toCreate = [DocumentTypes.Prevote, DocumentTypes.Snapshot];
    } else if (data.document_type === DocumentTypes.Snapshot) {
      toCreate = [DocumentTypes.Snapshot];
    } else {
      toCreate = [DocumentTypes.Prevote];
    }

    let company;
    try {
      company = await this.app.service('api/companies').get(data.company_id);

      /*
       * Check if we already created any of these documents.
       */
      toCreate.forEach((doc) => {
        if (company.company_links[doc]) {
          toCreate.shift();
        }
      });

      if (toCreate.length === 0) return;
    } catch (e) {
      throw new errors.BadRequest('Invalid Company Id');
    }

    /*
     * Create and authenticate the jwt client.
     */
    const jwtClient = new google.auth.JWT(
      config.googleDrive.googleServiceEmail,
      null,
      config.googleDrive.googleServiceKey,
      ['https://www.googleapis.com/auth/drive']
    );

    jwtClient.authorize((err) => {
      if (err) {
        logger.error('error while authorizing google drive client', err);
        throw new errors.BadRequest('Google Drive Authentication Error');
      }
    });

    const drive = google.drive({
      version: 'v3',
      auth: jwtClient,
    });

    toCreate.forEach(async (docType) => {
      /* Get the relevant folder we want to store this document in. */
      const folder = config.get(
        `googleDrive.${docType}FolderIds.${company.team}`
      );

      const documentName = `[${data.company_id}] ${
        company.name
      } ${docType.toUpperCase()}`;

      await drive.files.create(
        {
          supportsTeamDrives: true,
          resource: {
            name: documentName,
            mimeType: 'application/vnd.google-apps.document',
            parents: [folder],
          },
        },
        async (err, res) => {
          if (err) {
            logger.error('error while creating file', err);
            throw new errors.BadRequest('Google Drive File Error');
          }

          const docLink = `https://docs.google.com/document/d/${res.data.id}`;

          // Update company in case of stale data.
          const company = await this.app
            .service('api/companies')
            .get(data.company_id);
          const newLinks = [
            ...company.company_links,
            { name: docType, url: docLink },
          ];

          /* Update the company links. */
          await this.app.service('api/companies').patch(data.company_id, {
            company_links: newLinks,
          });
        }
      );
    });

    return data;
  }
}

export default (app: App) => {
  app.use('/api/gdrive', new GDriveService());
  app.service('api/gdrive').hooks(hooks);
};
