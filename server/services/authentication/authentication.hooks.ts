import authentication, { hooks as authHooks } from '@feathersjs/authentication';
import config from 'config';

const cfg = config.get('authentication');

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authentication.hooks.authenticate(cfg.strategies)],
    update: [],
    patch: [],
    remove: [authentication.hooks.authenticate('jwt')],
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
