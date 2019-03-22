import React, { Component } from 'react';
import { ISubmitEvent } from 'react-jsonschema-form-bs4';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteFields } from '../../lib/voting';
import { OverallVote } from '../../schemas/vote';
import VotingForm from './VotingForm';
import { Subscribe } from 'unstated';
import UserContainer from '../../containers/UserContainer';

export interface VotingWorkflowProps {
  companyId: number;
  votingContainer: VotingContainer;
}

interface VotingWorkflowState {
  prevote: VoteFields;
  finalVote: VoteFields;
}

export default class VotingWorkflow extends Component<
  VotingWorkflowProps,
  VotingWorkflowState
> {
  state = {
    prevote: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
      overall_vote: OverallVote.DontFund,
    },
    finalVote: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
      overall_vote: OverallVote.DontFund,
    },
  };

  componentDidMount() {
    const { companyId, votingContainer: vc } = this.props;
    vc.initialize(companyId);
  }

  render() {
    const { companyId, votingContainer: vc } = this.props;
    const { prevote, finalVote } = this.state;

    return (
      <Subscribe to={[UserContainer]}>
        {(uc: UserContainer) => {
          const doingPrevote =
            vc.votingStatus(companyId, uc.user.id) ===
            VotingStatus.DoingPrevote;
          const doingFinalVote =
            vc.votingStatus(companyId, uc.user.id) ===
            VotingStatus.DoingFinalVote;

          return (
            <>
              <VotingForm
                formData={prevote}
                onSubmit={(evt: ISubmitEvent<VoteFields>) =>
                  vc.doPrevote(companyId, evt.formData)
                }
                disabled={!doingPrevote}
                onChange={(evt) => this.setState({ prevote: evt.formData })}
              />
              {doingPrevote || (
                <VotingForm
                  formData={finalVote}
                  onSubmit={(evt: ISubmitEvent<VoteFields>) =>
                    vc.doFinalVote(companyId, evt.formData)
                  }
                  disabled={!doingFinalVote}
                  onChange={(evt) => this.setState({ finalVote: evt.formData })}
                />
              )}
            </>
          );
        }}
      </Subscribe>
    );
  }
}
