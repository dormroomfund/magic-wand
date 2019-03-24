import { Team } from './user';

export enum Status {
  /** The company has applied. */
  Applied = 'applied',

  /** The company was allocated a point partner. */
  Pipeline = 'pipeline',

  /** The company was rejected without a pitch. */
  Rejected = 'rejected',

  /** The company is about to pitch. */
  Pitching = 'pitching',

  /** We decided to hold off on getting a pitch from this company. */
  Deferred = 'deferred',

  /** The company was approved for funding. */
  Accepted = 'accepted',

  /** The company pitched, but was ultimately rejected. */
  RejectedWithPitch = 'rejected-with-pitch',

  /** The company has received a check from us. */
  Funded = 'funded',

  /** The company was archived without consideration. */
  Archived = 'archived',
}

export const archivedStates = [
  Status.Rejected,
  Status.RejectedWithPitch,
  Status.Accepted,
  Status.Funded,
];

export interface PartnerVoteObj {
  vote_id: number;
  partner_id: number;
  name: string;
}

export interface Company {
  id?: number;
  name: string;
  description: string;
  team: Team;
  point_partners?: number[];
  industries?: string[];
  tags?: string[];
  status: Status;
  contact_email: string;
  snapshot?: string;
  prevote?: string;
  company_links?: {
    name?: string;
    url?: string;
  }[];
  partnerVotes?: {
    /* Note that is not db level but from a feathers hook */
    final: Array<PartnerVoteObj>;
    prevote: Array<PartnerVoteObj>;
  };
  created_at?: string;
  updated_at?: string;
}

// IMPORTANT: This needs to be kept in sync with the Typescript interface above.
export const companySchema = {
  type: 'object',
  required: ['name', 'description', 'contact_email', 'status'],
  description: 'Defines a company that DRF encounters',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    point_partners: { type: 'array', items: { type: 'integer' } },
    team: { type: 'string', enum: Object.values(Team) },
    industries: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
    status: {
      type: 'string',
      enum: Object.values(Status),
    },
    snapshot: { type: 'string' },
    prevote: { type: 'string' },
    contact_email: { type: 'string', format: 'email' },
    company_links: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          url: { type: 'string' },
        },
      },
    },
    partnerVotes: {
      type: 'object',
      properties: {
        final: { type: 'array', items: { type: 'boolean' } },
        url: { type: 'array', items: { type: 'string', format: 'url' } },
      },
    },
  },
};
