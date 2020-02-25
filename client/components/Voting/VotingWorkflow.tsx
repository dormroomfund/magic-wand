import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { ISubmitEvent } from 'react-jsonschema-form-bs4';
import { Subscribe } from 'unstated';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteFields } from '../../lib/voting';
import { OverallVote, VoteType } from '../../schemas/vote';
import CompanyRetriever from './CompanyRetriever';
import VoteDisplay from './VoteDisplay';
import VotingForm from './VotingForm';

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
      fitScore: 1,
      marketScore: 1,
      productScore: 1,
      teamScore: 1,
      overallVote: OverallVote.DontFund,
    },
    finalVote: {
      fitScore: 1,
      marketScore: 1,
      productScore: 1,
      teamScore: 1,
      overallVote: OverallVote.DontFund,
    },
  };

  render() {
    const { companyId } = this.props;
    const { prevote, finalVote } = this.state;

    return (
      <Subscribe to={[CurrentUserContainer, VotingContainer]}>
        {(cuc: CurrentUserContainer, vc: VotingContainer) => {
          const doingPrevote =
            vc.votingStatus(companyId, cuc.user.id) ===
            VotingStatus.DoingPrevote;
          const doingFinalVote =
            vc.votingStatus(companyId, cuc.user.id) ===
            VotingStatus.DoingFinalVote;
          const votingFinalized =
            vc.votingStatus(companyId, cuc.user.id) ===
            VotingStatus.VotingFinalized;

          return (
            <>
              <CompanyRetriever companyId={companyId} />
              <h2>Prevote</h2>
              {doingPrevote ? (
                <>
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
                    <p className="text-secondary">
                      {' '}
                      You have already cast a prevote.{' '}
                    </p>
                    <VoteDisplay
                      companyId={companyId}
                      userId={cuc.user.id}
                      voteType={VoteType.Prevote}
                    />
                    {vc
                      .company(companyId)
                      .companyLinks.find((x) => x.name === 'prevote') && (
                      <Button
                        as="a"
                        href={
                          vc
                            .company(companyId)
                            .companyLinks.find((x) => x.name === 'prevote').url
                        }
                        target="_blank"
                        style={{ marginTop: '0.5rem' }}
                      >
                        Open Prevote Discussion Document
                      </Button>
                    )}
                  </Alert>
                  <Row>
                    {vc
                      .votedPartners(companyId, VoteType.Prevote)
                      .map((voter) => (
                        <Col key={voter.voteId}>
                          <VoteDisplay
                            companyId={companyId}
                            userId={voter.partnerId}
                            voteType={VoteType.Prevote}
                            border={
                              voter.partnerId === cuc.user.id
                                ? 'primary'
                                : undefined
                            }
                          />
                        </Col>
                      ))}
                  </Row>
                </>
              )}
              {doingFinalVote ? (
                <>
                  <br />
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
                doingPrevote || (
                  <Alert variant="success" style={{ marginTop: '1rem' }}>
                    You have already cast a final vote.
                    <VoteDisplay
                      companyId={companyId}
                      userId={cuc.user.id}
                      voteType={VoteType.Final}
                    />
                  </Alert>
                )
              )}
              {votingFinalized && (
                <Row>
                  {vc.votedPartners(companyId, VoteType.Final).map((voter) => (
                    <Col key={voter.voteId}>
                      <VoteDisplay
                        companyId={companyId}
                        userId={voter.partnerId}
                        voteType={VoteType.Final}
                        border={
                          voter.partnerId === cuc.user.id
                            ? 'primary'
                            : undefined
                        }
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          );
        }}
      </Subscribe>
    );
  }
}
