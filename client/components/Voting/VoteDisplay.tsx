import React, { Component } from 'react';
import Card from 'react-bootstrap/lib/Card';
import { Vote, VoteType } from '../../schemas/vote';
import VotingContainer from '../../containers/VotingContainer';
import { withVotingContainer } from '../../lib/containers';

export interface VoteDisplayProps extends React.ComponentProps<typeof Card> {
  companyId: number;
  userId: number;
  voteType: VoteType;
  votingContainer: VotingContainer;
}

interface VoteDisplayState {
  vote?: Vote;
}

class VoteDisplay extends Component<VoteDisplayProps, VoteDisplayState> {
  state = { vote: undefined as Vote | undefined };

  async componentDidMount() {
    const { votingContainer: vc, companyId, userId, voteType } = this.props;

    const vote = await vc.findAndRetrieveVote(companyId, userId, voteType);
    this.setState({ vote });
  }

  render() {
    const { vote } = this.state;
    if (!vote) {
      return <span>Loading...</span>;
    }

    return (
      <Card {...this.props}>
        <Card.Body>
          <Card.Title>
            {vote.voter.firstName} {vote.voter.lastName}
          </Card.Title>
          <Card.Text>
            <strong>Market:</strong> {vote.marketScore} <br />
            <strong>Product:</strong> {vote.productScore} <br />
            <strong>Team:</strong> {vote.teamScore} <br />
            <strong>Fit:</strong> {vote.fitScore} <br />
            <strong>Overall Vote:</strong> {vote.overallVote} <br />
            <strong>Comment:</strong> {vote.comment} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default withVotingContainer(VoteDisplay);
