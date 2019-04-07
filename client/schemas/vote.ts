import { User } from './user';

export enum VoteType {
  Prevote = 'prevote',
  Final = 'final',
}
export interface Vote {
  id?: number;
  voteType: VoteType;
  partnerId: number;
  companyId: number;
  marketScore: number;
  productScore: number;
  teamScore: number;
  fitScore: number;
  overallVote: string;
  comment?: string;

  // Query-only Fields
  voter: Pick<User, 'firstName' | 'lastName'>;
}

export enum OverallVote {
  DontFund = "Don't Fund",
  Fund = 'Fund',
}

/**
 * Describes JSON validation schema for each model.
 */
export const voteSchema = {
  type: 'object',
  required: [
    'companyId',
    'partnerId',
    'voteType',
    'marketScore',
    'productScore',
    'overallVote',
    'fitScore',
    'teamScore',
  ],

  properties: {
    id: { type: 'integer' },
    voteType: {
      type: 'string',
      enum: Object.values(VoteType),
    },
    partnerId: { type: 'integer' },
    companyId: { type: 'integer' },
    marketScore: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    productScore: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    teamScore: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    fitScore: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    overallVote: { type: 'string', enum: Object.values(OverallVote) },
    comment: { type: 'string' },
  },
};
