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
    marketScore: {
      type: 'integer',
      enum: [1, 2, 3, 4, 5],
      title: 'Market Score',
    },
    productScore: {
      type: 'integer',
      enum: [1, 2, 3, 4, 5],
      title: 'Product Score',
    },
    teamScore: { type: 'integer', enum: [1, 2, 3, 4, 5], title: 'Team Score' },
    fitScore: { type: 'integer', enum: [1, 2, 3, 4, 5], title: 'Fit Score' },
    overallVote: {
      type: 'string',
      enum: Object.values(OverallVote),
      title: 'Overall Vote',
    },
    comment: {
      type: 'string',
      title: 'Comment',
      default: 'Fit: \nMarket: \nProduct: \nTeam: \nOverall:',
    },
  },
};

/**
 * Describes UI configurations for the voting form.
 */
export const voteUISchema = {
  comment: {
    'ui:widget': 'textarea',
    'ui:default': 'Choose an option',
    'ui:options': {
      rows: 8,
    },
  },
};
