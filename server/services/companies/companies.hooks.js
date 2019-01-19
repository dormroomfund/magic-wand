import { fastJoin, validateSchema } from 'feathers-hooks-common';
import Ajv from 'ajv';
import schema from '../../../client/shared/schema';

const ajv = new Ajv({ allErrors: true, $data: true });

/*
 * Uses fastJoin to query all the partners who have voted on the
 * company.
 */
const votedPartners = {
  joins: {
    voters: () => async (company, context) => {
      const votes = context.app.service('api/votes');
      const associatedVotes = (await votes.find({
        query: {
          company_id: company.id,
          $eager: 'voted_users',
        },
      })).data;

      const partnerVotes = { prevote: [], final: [] };
      await associatedVotes.forEach((vote) => {
        if (vote.vote_type === 'prevote') {
          partnerVotes.prevote.push(
            `${vote.voted_users.first_name} ${vote.voted_users.last_name}`
          );
        } else {
          partnerVotes.final.push(
            `${vote.voted_users.first_name} ${vote.voted_users.last_name}`
          );
        }
      });

      company.partnerVotes = partnerVotes;
    },
  },
};
const partialSchema = {
  type: schema.companies.type,
  properties: schema.companies.properties,
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSchema(schema.companies, ajv)],
    update: [validateSchema(partialSchema, ajv)],
    patch: [validateSchema(partialSchema, ajv)],
    remove: [],
  },
  after: {
    all: [fastJoin(votedPartners)],
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
