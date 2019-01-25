import {  AjvOrNewable, validateSchema, fastJoin } from 'feathers-hooks-common';
import Ajv from 'ajv';
import schema from '../../../client/shared/schema';

const ajv = new Ajv({ allErrors: true, $data: true });

/*
 * Partial Schema needed for PATCH and UPDATE calls.
 */
const partialSchema = {
  type: schema.companies.type,
  properties: schema.companies.properties,
  additionalProperties: false,
};

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

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSchema(schema.companies, <AjvOrNewable> ajv)],
    update: [validateSchema(partialSchema, <AjvOrNewable> ajv)],
    patch: [validateSchema(partialSchema, <AjvOrNewable> ajv)],
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
