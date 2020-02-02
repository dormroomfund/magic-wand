import { Team } from './common';
import { User } from './user';

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

/* States for when a company Pitched */
export const pitchedStates = [
  Status.RejectedWithPitch,
  Status.Accepted,
  Status.Funded,
];

export interface PartnerVoteObj {
  voteId: number;
  partnerId: number;
  name: string;
}

export interface CompanyLink {
  name?: string;
  url?: string;
}

export interface Company {
  id?: number;
  name: string;
  description: string;
  team: Team;
  industries?: string[];
  tags?: string[];
  status: Status;
  contactEmail: string;
  companyLinks?: CompanyLink[];

  /** Date that the company will pitch/pitched. */
  pitchDate?: string;

  googleFolderId?: string;
  createdAt?: string;
  updatedAt?: string;

  // Non-mutable fields
  readonly typeformData?: object;

  // Server-generated fields
  pointPartners?: User[];
  partnerVotes?: {
    final: PartnerVoteObj[];
    prevote: PartnerVoteObj[];
  };
  voteResults?: {
    numYes: number;
    numNo: number;
    marketScoreAvg: number;
    fitScoreAvg: number;
    productScoreAvg: number;
    teamScoreAvg: number;
  };
}

// IMPORTANT: This needs to be kept in sync with the Typescript interface above.
export const companySchema = {
  type: 'object',
  required: ['name', 'description', 'contactEmail', 'status'],
  description: 'Defines a company that DRF encounters',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    team: { type: 'string', enum: Object.values(Team) },
    industries: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
    status: {
      type: 'string',
      enum: Object.values(Status),
    },
    contactEmail: { type: 'string', format: 'email' },
    companyLinks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          url: { type: 'string' },
        },
      },
    },
    pitchDate: {
      type: ['string', 'null'],
      format: 'date',
    },
    googleFolderId: { type: 'string' },
    // server generated
    partnerVotes: {
      type: 'object',
      properties: {
        final: { type: 'array', items: { type: 'boolean' } },
        url: { type: 'array', items: { type: 'string', format: 'url' } },
      },
    },
    voteResults: {
      type: 'object',
      properties: {
        numYes: { type: 'number' },
        numNo: { type: 'number' },
        marketScoreAvg: { type: 'number' },
        fitScoreAvg: { type: 'number' },
        productScoreAvg: { type: 'number' },
        teamScoreAvg: { type: 'number' },
      },
    },
    additionalProperties: false,
  },
};
