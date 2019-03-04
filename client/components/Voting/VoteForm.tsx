/*
 * Voting component with increment decrements and submit butto
 */
import React from 'react';
import { OverallVote } from '../../schemas/vote';

interface VoteFormProps {
  companyID: number /* The id of the company being voted on */;
  partnerID: number /* The id of the voting partner */;
  voteType: string /* The Type of vote being done */;
}

interface VoteFormState {
  voteData: object;
  submitted: boolean;
}

export default class VoteForm extends React.Component<
  VoteFormProps,
  VoteFormState
> {
  state = {
    voteData: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
      overall_vote: OverallVote.DontFund,
    },
    submitted: false,
  };



}
