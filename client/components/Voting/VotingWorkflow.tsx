import React, { Component } from 'react';
import { ISubmitEvent } from 'react-jsonschema-form-bs4';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteFields, voteFormSchema } from '../../lib/voting';
import { OverallVote, VoteType } from '../../schemas/vote';
import VotingForm from './VotingForm';
import { Subscribe } from 'unstated';
import UserContainer from '../../containers/UserContainer';
import CompanyRetriever from './CompanyRetriever';
import Alert from 'react-bootstrap/lib/Alert';
import VoteDisplay from './VoteDisplay';

export interface VotingWorkflowProps {
  companyId: number;
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

  render() {
    const { companyId } = this.props;
    const { prevote, finalVote } = this.state;

    return (
      <Subscribe to={[UserContainer, VotingContainer]}>
        {(uc: UserContainer, vc: VotingContainer) => {
          const doingPrevote =
            vc.votingStatus(companyId, uc.user.id) ===
            VotingStatus.DoingPrevote;
          const doingFinalVote =
            vc.votingStatus(companyId, uc.user.id) ===
            VotingStatus.DoingFinalVote;

          return (
            <>
              <CompanyRetriever companyId={companyId} votingContainer={vc} />
              {doingPrevote ? (
                <>
                  <h2>Prevote</h2>
                  <VotingForm
                    formData={prevote}
                    onSubmit={(evt: ISubmitEvent<VoteFields>) =>
                      vc.doPrevote(companyId, evt.formData)
                    }
                    disabled={!doingPrevote}
                    onChange={(evt) => this.setState({ prevote: evt.formData })}
                  />
                </>
              ) : (
                <>
                  <Alert variant="success">
                    You have already cast a prevote.
                  </Alert>
                  <VoteDisplay
                    vote={vc.findVote(companyId, uc.user.id, VoteType.Prevote)}
                  />
                </>
              )}
              {doingFinalVote ? (
                <>
                  <h2>Final Vote</h2>
                  <VotingForm
                    formData={finalVote}
                    onSubmit={(evt: ISubmitEvent<VoteFields>) =>
                      vc.doFinalVote(companyId, evt.formData)
                    }
                    disabled={!doingFinalVote}
                    onChange={(evt) =>
                      this.setState({ finalVote: evt.formData })
                    }
                  />
                </>
              ) : (
                <>
                  <Alert variant="success">
                    You have already cast a final vote.
                  </Alert>
                  <VoteDisplay
                    vote={vc.findVote(companyId, uc.user.id, VoteType.Final)}
                  />
                </>
              )}
            </>
          );
        }}
      </Subscribe>
    );
  }
}
