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
import { google } from 'googleapis';
import config from 'config';
import App from '../../../client/schemas/app';
import hooks from './gdrive.hooks';
import { DocumentTypes } from '../../../client/schemas/gdrive';

export default (app: App) => {
  class GDriveService {
    async create(data) {
      /*
       * Get the documents we need to create
       */
      let toCreate;
      if (data.document_type === DocumentTypes.Both) {
        toCreate = [DocumentTypes.Prevote, DocumentTypes.Snapshot];
      } else if (data.document_type === DocumentTypes.Snapshot) {
        toCreate = [DocumentTypes.Snapshot];
      } else {
        toCreate = [DocumentTypes.Prevote];
      }

      let company;
      try {
        company = await app.service('api/companies').get(data.company_id);

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
        if (err) throw new errors.BadRequest('Google Drive Error');
      });

      const drive = google.drive({
        version: 'v3',
        auth: jwtClient,
      });

      toCreate.forEach(async (docType) => {
        /*
         * Get the relevant folder we want to store this document in
         */
        const folder = config.googleDrive[docType][company.team];

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
              throw new errors.BadRequest('Google Drive Error');
            }

            const docLink = `https://docs.google.com/document/d/${res.data.id}`;
            company.company_links.push({ name: docType, url: docLink });

            /*
             * Update the company links.
             */

            await app.service('api/companies').patch(data.company_id, {
              company_links: company.company_links,
            });
          }
        );
      });

      return data;
    }
  }

  app.use('/api/gdrive', new GDriveService());
  app.service('api/gdrive').hooks(hooks);
};
