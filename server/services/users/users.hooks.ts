import Ajv from 'ajv';
import { JSONSchema6 } from 'json-schema';
import { userSchema } from '../../../client/schemas/user';
import { makePartial } from '../../../client/schemas/_utils';
import { authenticate } from '../../hooks/authentication';

const ajv = new Ajv({ allErrors: true, $data: true });
const partialSchema = makePartial(userSchema as JSONSchema6);

const customizeOAuthProfile = () => async (context) => {
  if (context.data.auth0 && context.data.auth0.profile) {
    const { profile } = context.data.auth0;
    context.data.email = profile.emails[0].value;
    context.data.firstName = profile.name.givenName;
    context.data.lastName = profile.name.familyName;
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
      customizeOAuthProfile(),
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
