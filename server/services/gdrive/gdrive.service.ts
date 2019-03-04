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

export default (app: App) => {
  const GDriveService = {
    async create(data) {
      /*
       * Get the documents we need to create
       */
      let toCreate;
      if (data.document_type === 'both') {
        toCreate = ['prevote', 'snapshot'];
      } else if (data.document_type === 'snapshot') {
        toCreate = ['snapshot'];
      } else {
        toCreate = ['prevote'];
      }

      /*
       * Get the associated company
       */
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
       * Create the jwt client.
       */
      const jwtClient = new google.auth.JWT(
        config.googleDrive.googleServiceEmail,
        null,
        config.googleDrive.googleServiceKey,
        ['https://www.googleapis.com/auth/drive']
      );

      /*
       * Authenticate the JWT request
       */
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

        /*
         * Create either a prevote document or a snapshot
         */
        const documentName = `[${data.company_id}] ${
          company.name
        } ${docType.toUpperCase()}`;

        /*
         * Return array of ids.
         */

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
             * Update the company
             */
            try {
              await app.service('api/companies').patch(data.company_id, {
                company_links: company.company_links,
              });
            } catch (e) {
              return e;
            }
          }
        );
      });

      return data;
    },
  };

  app.use('/api/gdrive', GDriveService);
  app.service('api/gdrive').hooks(hooks);
};
