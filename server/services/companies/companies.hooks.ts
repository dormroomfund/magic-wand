import Ajv from 'ajv';
import { alterItems, fastJoin, keep, iff } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import {
  companySchema,
  Company,
  Status,
} from '../../../client/schemas/company';
import { DocumentTypes } from '../../../client/schemas/gdrive';

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
          companyId: company.id,
          $eager: 'voter',
        },
      })).data;

      const partnerVotes = { prevote: [], final: [] };
      await associatedVotes.forEach((vote) => {
        const partnerObj = {
          name: `${vote.voter.firstName} ${vote.voter.lastName}`,
          partnerId: vote.partnerId,
          voteId: vote.id,
        };
        if (vote.voteType === 'prevote') {
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
      if (company.pointPartners) {
        const pointPartnerObjs = (await users.find({
          query: {
            id: { $in: company.pointPartners },
            $select: ['firstName', 'lastName'],
          },
        })).data;

        /*
         * Convert to actual first names
         */
        company.pointPartnerNames = [];
        pointPartnerObjs.forEach((obj) => {
          const partnerName = `${obj.firstName} ${obj.lastName}`;
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
      documentType: DocumentTypes.Prevote,
      companyId: ctx.result.id,
    }),
    ctx.app.service('api/gdrive').create({
      documentType: DocumentTypes.Snapshot,
      companyId: ctx.result.id,
    }),
  ]);
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      alterItems((company: Company) => {
        // TODO
        // company.pointPartners = company.pointPartners || [];
        company.industries = company.industries || [];
        company.tags = company.tags || [];
        company.companyLinks = company.companyLinks || [];
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
