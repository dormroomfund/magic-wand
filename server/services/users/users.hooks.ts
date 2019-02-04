import { hooks as authHooks } from '@feathersjs/authentication';

const { authenticate } = authHooks;

const customizeOAuthProfile = () => async (context) => {
  if (context.data.auth0) {
    context.data.email = context.data.auth0.profile.emails[0].value;
  }

  return context;
};

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [customizeOAuthProfile()],
    update: [authenticate('jwt'), customizeOAuthProfile()],
    patch: [authenticate('jwt')],
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
