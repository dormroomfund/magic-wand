import Ajv from 'ajv';
import { alterItems, fastJoin, keep } from 'feathers-hooks-common';
import { companySchema } from '../../../client/schemas/company';

const ajv = new Ajv({ allErrors: true, $data: true });

/*
 * Partial Schema needed for PATCH and UPDATE calls.
 */
const partialSchema = {
  type: companySchema.type,
  properties: companySchema.properties,
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

const pointPartners = {
  joins: {
    partners: () => async (company, context) => {
      const users = context.app.service('api/users');
      if (company.point_partners) {
        const pointPartnerObjs = (await users.find({
          query: {
            id: { $in: company.point_partners },
            $select: ['first_name', 'last_name'],
          },
        })).data;

        /*
         * Convert to actual first names
         */
        company.pointPartnerNames = [];
        pointPartnerObjs.forEach((obj) => {
          const partnerName = `${obj.first_name} ${obj.last_name}`;
          company.pointPartnerNames.push(partnerName);
        });
      }
    },
  },
};
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      alterItems((company) => {
        company.point_partners = company.point_partners || [];
        company.industries = company.industries || [];
        company.tags = company.tags || [];
        company.company_links = company.company_links || [];
      }),
      /*validateSchema(companies, <AjvOrNewable> ajv)*/
    ],
    update: [
      keep(...Object.keys(companySchema.properties)),
      /*validateSchema(partialSchema, <AjvOrNewable>ajv)*/
    ],
    patch: [
      keep(...Object.keys(companySchema.properties)),
      /*validateSchema(partialSchema, <AjvOrNewable>ajv)*/
    ],
    remove: [],
  },
  after: {
    all: [fastJoin(votedPartners), fastJoin(pointPartners)],
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
