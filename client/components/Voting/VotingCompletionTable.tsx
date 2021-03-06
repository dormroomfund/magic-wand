import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import VotingContainer from '../../containers/VotingContainer';
import { PartnerVoteObj, archivedStates } from '../../schemas/company';
import {
  withVotingContainer,
  VotingContainerProps,
} from '../../lib/containers';

export interface VotingCompletionTableProps {
  companyId: number;
  votes: PartnerVoteObj[];
}
export default withVotingContainer(
  ({
    companyId,
    votes,
    votingContainer: vc,
  }: VotingCompletionTableProps & VotingContainerProps) => (
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
            <td>{vote.name}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => vc.deleteVote(vote.voteId)}
                disabled={archivedStates.includes(vc.company(companyId).status)}
              >
                Delete Vote
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
);
