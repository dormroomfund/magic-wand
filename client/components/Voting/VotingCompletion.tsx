import React, { Component } from 'react';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteType } from '../../schemas/vote';
import { differenceWith } from 'lodash';
import Table from 'react-bootstrap/lib/Table';
import { PartnerVoteObj, archivedStates } from '../../schemas/company';
import Button from 'react-bootstrap/lib/Button';
import UserContainer from '../../containers/UserContainer';
import { Subscribe } from 'unstated';

export interface VotingCompletionProps {
  companyId: number;
  votingContainer: VotingContainer;
}

export default class VotingCompletion extends Component<VotingCompletionProps> {
  componentDidMount() {
    const { companyId, votingContainer: vc } = this.props;
    vc.retrieveCompany(companyId);
  }

  renderTable(votes: Array<PartnerVoteObj>) {
    const { companyId, votingContainer: vc } = this.props;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Partner</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {votes.map((vote) => (
            <tr key={vote.name}>
              <td> {vote.name} </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => vc.deleteVote(vote.vote_id, vote.partner_id)}
                  disabled={archivedStates.includes(
                    vc.company(companyId).status
                  )}
                >
                  Delete Vote
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { companyId, votingContainer: vc } = this.props;

    const prevotedPartners = vc.votedPartners(companyId, VoteType.Prevote);
    const finalVotedPartners = vc.votedPartners(companyId, VoteType.Final);
    const waitingOnPartners = differenceWith(
      prevotedPartners,
      finalVotedPartners,
      (a, b) => a.partner_id === b.partner_id
    );

    return (
      <Subscribe to={[UserContainer]}>
        {(uc: UserContainer) => {
          if (
            vc.votingStatus(companyId, uc.user.id) !==
              VotingStatus.AwaitingFinalization ||
            prevotedPartners.length === 0 ||
            finalVotedPartners.length === 0
          ) {
            return null;
          }

          return (
            <>
              <p>The following partners have submitted final votes.</p>
              {this.renderTable(finalVotedPartners)}
              {waitingOnPartners.length > 0 ? (
                <>
                  <p>
                    The following partners have submitted a prevote but not a
                    final vote:
                  </p>
                  {this.renderTable(waitingOnPartners)}
                </>
              ) : (
                (vc.votingStatus(companyId, uc.user.id) !==
                  VotingStatus.AwaitingFinalization ||
                  uc.user.partner_position !== 'Managing Partner') && (
                  <Button
                    onClick={() => vc.finalizeVotes(companyId)}
                    disabled={
                      vc.votingStatus(companyId, uc.user.id) ===
                      VotingStatus.VotingFinalized
                    }
                  >
                    Finalize Votes
                  </Button>
                )
              )}
            </>
          );
        }}
      </Subscribe>
    );
  }
}
