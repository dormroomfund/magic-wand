import { HookContext } from '@feathersjs/feathers';
import { iff, callingParams } from 'feathers-hooks-common';

// const voteExists = async (context: HookContext<any>) => {
//   console.log(context);
//   const votes = await context.service.find({
//     id: context.data.id,
//   });
//
//   if (votes.length > 1) {
//     throw new Error('Repeated vote id');
//   } else return votes.length === 1;
// };
//
// const upsertVote = async (context: HookContext<any>) => {
//   context.result = await context.service.patch(
//     (context.data && context.data.id) || null,
//     context.data || {},
//     callingParams({})(context)
//   );
// };

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      /* iff(voteExists, upsertVote) */
    ],
    update: [],
    patch: [],
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
