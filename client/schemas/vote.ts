export interface Vote {
  id?: number;
  vote_type: 'prevote' | 'final';
  partner_id: number;
  company_id: number;
  market_score: number;
  product_score: number;
  team_score: number;
  fit_score: number;
  comment?: string;
}

/**
 * Describes JSON validation schema for each model.
 */
export const voteSchema = {
  type: 'object',
  required: [
    'company_id',
    'partner_id',
    'vote_type',
    'market_score',
    'product_score',
    'fit_score',
    'team_score',
  ],

  properties: {
    id: { type: 'integer' },
    vote_type: {
      type: 'string',
      enum: ['prevote', 'final'],
    },
    partner_id: { type: 'integer' },
    company_id: { type: 'integer' },
    market_score: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    product_score: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    team_score: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    fit_score: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    comment: { type: 'string' },
  },
};