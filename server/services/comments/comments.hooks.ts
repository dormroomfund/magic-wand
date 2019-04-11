import Ajv from 'ajv';
import { associateCurrentUser } from 'feathers-authentication-hooks';
import { discard, keep, disallow } from 'feathers-hooks-common';
import { commentSchema } from '../../../client/schemas/comment.schema';
import { authenticate } from '../../hooks/authentication';

const ajv = new Ajv({ allErrors: true, $data: true });

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      keep(...Object.keys(commentSchema.properties)),
      discard('id'),
      associateCurrentUser({ idField: 'id', as: 'userId' }),
      /* validateSchema(commentSchema, <AjvOrNewable> ajv) */
    ],
    update: [
      disallow('external'),
      keep(...Object.keys(commentSchema.properties)),
      /* validateSchema(commentSchema, <AjvOrNewable>ajv) */
    ],
    patch: [
      keep(...Object.keys(commentSchema.properties)),
      discard('id', 'userId'),
      /* validateSchema(commentSchema, <AjvOrNewable>ajv) */
    ],
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
