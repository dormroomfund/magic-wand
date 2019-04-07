import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import { hooks as authHooks } from '@feathersjs/authentication';

const { authenticate } = authHooks;

// TODO: Verify that the user is in the same team as the company they're modifying.
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [disallow('external')],
    create: [iff(isProvider('external'), discard('id'))],
    update: [disallow('external')],
    patch: [disallow('external')],
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
