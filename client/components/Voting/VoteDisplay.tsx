import React, { Component } from 'react';
import Card from 'react-bootstrap/lib/Card';
import { Vote, VoteType } from '../../schemas/vote';
import VotingContainer from '../../containers/VotingContainer';
import { withVotingContainer } from '../../lib/containers';

export interface VoteDisplayProps {
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
      <Card>
        <Card.Body>
          <Card.Title>Vote</Card.Title>
          <Card.Text>
            <strong>Market: </strong>
            {vote.market_score}
          </Card.Text>
          <Card.Text>
            <strong>Product: </strong>
            {vote.product_score}
          </Card.Text>
          <Card.Text>
            <strong>Team: </strong>
            {vote.team_score}
          </Card.Text>
          <Card.Text>
            <strong>Fit: </strong>
            {vote.team_score}
          </Card.Text>
          <Card.Text>
            <strong>Overall Vote: </strong>
            {vote.overall_vote}
          </Card.Text>
          <Card.Text>
            <strong>Comment: </strong>
            {vote.comment}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default withVotingContainer(VoteDisplay);
