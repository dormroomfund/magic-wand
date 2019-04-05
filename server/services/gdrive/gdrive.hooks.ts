import Ajv from 'ajv';
import { AjvOrNewable, validateSchema } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import {
  gDriveSchema,
  GoogleDriveDocument,
} from '../../../client/schemas/gdrive';

const ajv = new Ajv({ allErrors: true, $data: true });

const addLinkToCompany = async (ctx: HookContext<GoogleDriveDocument>) => {
  const { document_id, document_type, company_id } = ctx.result;

  const company = await ctx.app.service('api/companies').get(company_id);
  const docLink = `https://docs.google.com/document/d/${document_id}`;

  await ctx.app.service('api/companies').patch(company_id, {
    company_links: [
      ...company.company_links,
      { name: document_type, url: docLink },
    ],
  });
};

export default {
  before: {
    all: [],
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
