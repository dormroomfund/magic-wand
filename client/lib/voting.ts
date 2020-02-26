import { JSONSchema6 } from 'json-schema';
import { pick, makeRequired } from '../schemas/_utils';
import { voteSchema, Vote, OverallVote } from '../schemas/vote';

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

/**
 * Describes UI configurations for the voting form.
 */
export const voteUIFormSchema = {
  comment: {
    'ui:widget': 'textarea',
    'ui:default': 'Choose an option',
    'ui:options': {
      rows: 8,
    },
  },
};

export const computeVotingScores = (votes: Vote[]) => {
  /*
   * Go through each of the votes and determine the number of yes
   * votes and the number of no votes.
   */
  let numYes = 0;
  let numNo = 0;
  let marketScoreAvg = 0;
  let productScoreAvg = 0;
  let teamScoreAvg = 0;
  let fitScoreAvg = 0;

  votes.forEach((vote) => {
    marketScoreAvg += vote.marketScore;
    productScoreAvg += vote.productScore;
    teamScoreAvg += vote.teamScore;
    fitScoreAvg += vote.fitScore;

    if (vote.overallVote === OverallVote.Fund) {
      numYes += 1;
    } else {
      numNo += 1;
    }
  });

  marketScoreAvg /= votes.length;
  productScoreAvg /= votes.length;
  teamScoreAvg /= votes.length;
  fitScoreAvg /= votes.length;

  return {
    numYes,
    numNo,
    marketScoreAvg,
    fitScoreAvg,
    productScoreAvg,
    teamScoreAvg,
  };
};
