import { JSONSchema6 } from 'json-schema';
import { pick, makeRequired } from '../schemas/_utils';
import { voteSchema, Vote } from '../schemas/vote';

const requiredFields = [
  'fitScore',
  'marketScore',
  'productScore',
  'teamScore',
  'overallVote',
  'comment',
];

export type VoteFields = Pick<
  Vote,
  | 'fitScore'
  | 'marketScore'
  | 'productScore'
  | 'teamScore'
  | 'overallVote'
  | 'comment'
>;

export const voteFormSchema = makeRequired(
  pick(voteSchema as JSONSchema6, requiredFields),
  requiredFields
);
