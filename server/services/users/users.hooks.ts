import { hooks as authHooks } from '@feathersjs/authentication';
import { AjvOrNewable, validateSchema } from 'feathers-hooks-common';
import Ajv from 'ajv';
import schema from '../../../client/shared/schema';

const { authenticate } = authHooks;
const ajv = new Ajv({ allErrors: true, $data: true });

const partialSchema = {
  type: schema.users.type,
  properties: schema.users.properties,
};

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateSchema(schema.users, <AjvOrNewable> ajv)],
    update: [authenticate('jwt'), validateSchema(partialSchema, <AjvOrNewable> ajv)],
    patch: [authenticate('jwt'), validateSchema(partialSchema, <AjvOrNewable> ajv)],
    remove: [authenticate('jwt')],
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
