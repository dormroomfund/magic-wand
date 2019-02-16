import { hooks as authHooks } from '@feathersjs/authentication';
import Ajv from 'ajv';
import { userSchema } from '../../../client/schemas/user';

const { authenticate } = authHooks;
const ajv = new Ajv({ allErrors: true, $data: true });

const partialSchema = {
  type: userSchema.type,
  properties: userSchema.properties,
  additionalProperties: false,
};

const customizeOAuthProfile = () => async (context) => {
  if (context.data.auth0 && context.data.auth0.profile) {
    const { profile } = context.data.auth0;
    context.data.email = profile.emails[0].value;
    context.data.first_name = profile.name.givenName;
    context.data.last_name = profile.name.familyName;
    context.data.photo = profile.picture;
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
      // validateSchema(userSchema, <AjvOrNewable>ajv),
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
