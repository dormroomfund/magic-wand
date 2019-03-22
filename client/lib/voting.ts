import { pick, makeRequired } from '../schemas/_utils';
import { voteSchema, Vote } from '../schemas/vote';
import { JSONSchema6 } from 'json-schema';

const requiredFields = [
  'fit_score',
  'market_score',
  'product_score',
  'team_score',
  'overall_vote',
];

export type VoteFields = Pick<
  Vote,
  'fit_score' | 'market_score' | 'product_score' | 'team_score' | 'overall_vote'
>;

export const voteFormSchema = makeRequired(
  pick(voteSchema as JSONSchema6, requiredFields),
  requiredFields
);
