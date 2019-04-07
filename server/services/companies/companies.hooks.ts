import { HookContext } from '@feathersjs/feathers';
import Ajv from 'ajv';
import { alterItems, fastJoin, iff, keep } from 'feathers-hooks-common';
import {
  Company,
  companySchema,
  Status,
} from '../../../client/schemas/company';
import { DocumentTypes } from '../../../client/schemas/gdrive';
import { authenticate } from '../../hooks/authentication';

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
          $eager: 'voter',
        },
      })).data;

      const partnerVotes = { prevote: [], final: [] };
      await associatedVotes.forEach((vote) => {
        const partnerObj = {
          name: `${vote.voter.first_name} ${vote.voter.last_name}`,
          partner_id: vote.partner_id,
          vote_id: vote.id,
        };
        if (vote.vote_type === 'prevote') {
          partnerVotes.prevote.push(partnerObj);
        } else {
          partnerVotes.final.push(partnerObj);
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

const isPitching = async (ctx: HookContext<Company>) =>
  ctx.result.status === Status.Pitching;

const generateGoogleDriveDocuments = async (ctx: HookContext<Company>) => {
  await Promise.all([
    ctx.app.service('api/gdrive').create({
      document_type: DocumentTypes.Prevote,
      company_id: ctx.result.id,
    }),
    ctx.app.service('api/gdrive').create({
      document_type: DocumentTypes.Snapshot,
      company_id: ctx.result.id,
    }),
  ]);
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      alterItems((company) => {
        company.point_partners = company.point_partners || [];
        company.industries = company.industries || [];
        company.tags = company.tags || [];
        company.company_links = company.company_links || [];
      }),
      /* validateSchema(companies, <AjvOrNewable> ajv) */
    ],
    update: [
      keep(...Object.keys(companySchema.properties)),
      /* validateSchema(partialSchema, <AjvOrNewable>ajv) */
    ],
    patch: [
      keep(...Object.keys(companySchema.properties)),
      /* validateSchema(partialSchema, <AjvOrNewable>ajv) */
    ],
    remove: [],
  },
  after: {
    all: [fastJoin(votedPartners), fastJoin(pointPartners)],
    find: [],
    get: [],
    create: [iff(isPitching, generateGoogleDriveDocuments)],
    update: [iff(isPitching, generateGoogleDriveDocuments)],
    patch: [iff(isPitching, generateGoogleDriveDocuments)],
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
