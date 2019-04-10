import Ajv from 'ajv';
import { AjvOrNewable, validateSchema, disallow } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import {
  gDriveSchema,
  GoogleDriveDocument,
} from '../../../client/schemas/gdrive';

const ajv = new Ajv({ allErrors: true, $data: true });

const addLinkToCompany = async (ctx: HookContext<GoogleDriveDocument>) => {
  const { documentId, documentType, companyId } = ctx.result;

  const company = await ctx.app.service('api/companies').get(companyId);
  const docLink = `https://docs.google.com/document/d/${documentId}`;

  await ctx.app.service('api/companies').patch(companyId, {
    companyLinks: [
      ...company.companyLinks,
      { name: documentType, url: docLink },
    ],
  });
};

export default {
  before: {
    all: [disallow('external')],
    find: [],
    get: [],
    create: [validateSchema(gDriveSchema, ajv as AjvOrNewable)], // TODO: Validate Permissions
    update: [validateSchema(gDriveSchema, ajv as AjvOrNewable)],
    patch: [validateSchema(gDriveSchema, ajv as AjvOrNewable)],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addLinkToCompany],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
