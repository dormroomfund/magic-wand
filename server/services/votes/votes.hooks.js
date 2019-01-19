import { validateSchema } from 'feathers-hooks-common';
import Ajv from 'ajv';
import schema from '../../../client/shared/schema';

const ajv = new Ajv({ allErrors: true, $data: true });

const partialSchema = {
  type: schema.votes.type,
  properties: schema.votes.properties,
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSchema(schema.votes, ajv)],
    update: [validateSchema(partialSchema, ajv)],
    patch: [validateSchema(partialSchema, ajv)],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
