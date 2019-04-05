import { JSONSchema6 } from 'json-schema';
import { pick, makeRequired } from '../schemas/_utils';
import { voteSchema, Vote } from '../schemas/vote';

const requiredFields = [
  'fit_score',
  'market_score',
  'product_score',
  'team_score',
  'overall_vote',
  'comment',
];

export type VoteFields = Pick<
  Vote,
  | 'fit_score'
  | 'market_score'
  | 'product_score'
  | 'team_score'
  | 'overall_vote'
  | 'comment'
>;

export const voteFormSchema = makeRequired(
  pick(voteSchema as JSONSchema6, requiredFields),
  requiredFields
);
