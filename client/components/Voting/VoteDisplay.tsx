import React from 'react';
import { Vote } from '../../schemas/vote';
import Card from 'react-bootstrap/lib/Card';

export interface VoteDisplayProps {
  vote: Vote;
}

export default ({ vote }: VoteDisplayProps) => {
  if (!vote) {
    return <span>Loading...</span>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Vote</Card.Title>
        <Card.Text>
          <strong>Market:</strong> {vote.market_score}
        </Card.Text>
        <Card.Text>
          <strong>Product:</strong> {vote.product_score}
        </Card.Text>
        <Card.Text>
          <strong>Team:</strong> {vote.team_score}
        </Card.Text>
        <Card.Text>
          <strong>Fit:</strong> {vote.team_score}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
