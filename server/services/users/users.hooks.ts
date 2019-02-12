import { hooks as authHooks } from '@feathersjs/authentication';
import Ajv from 'ajv';
import schema from '../../../client/shared/schema';

const { authenticate } = authHooks;
const ajv = new Ajv({ allErrors: true, $data: true });

const partialSchema = {
  type: schema.users.type,
  properties: schema.users.properties,
  additionalProperties: false,
};

const customizeOAuthProfile = () => async (context) => {
  if (context.data.auth0) {
    context.data.email = context.data.auth0.profile.emails[0].value;
    context.data.first_name = context.data.auth0.profile.name.givenName;
    context.data.last_name = context.data.auth0.profile.name.familyName;
  }

  return context;
};

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      customizeOAuthProfile(),
      // validateSchema(schema.users, <AjvOrNewable>ajv),
    ],
    update: [
      authenticate('jwt'),
      // validateSchema(partialSchema, <AjvOrNewable>ajv),
    ],
    patch: [
      authenticate('jwt'),
      // validateSchema(partialSchema, <AjvOrNewable>ajv),
    ],
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
