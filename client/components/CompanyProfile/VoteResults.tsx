/* Displays the voting Results of a company */
import Card from 'react-bootstrap/lib/Card';
import React from 'react';
import { Company } from '../../schemas/company';

export interface VotingResultsProps {
  company: Company;
}

export default ({ company }: VotingResultsProps) => (
  <Card style={{ marginBottom: '1rem', fontFamily: 'CircularStd-Bold' }}>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">{company.team}</Card.Subtitle>
      <Card.Title>
        {company.voteResults.numYes > company.voteResults.numNo ? (
          <span> Funded </span>
        ) : (
          <span> Rejected </span>
        )}
      </Card.Title>
      <Card.Text>
        <p>
          {company.voteResults.numYes} in favor, {company.voteResults.numNo}{' '}
          against.{' '}
        </p>
        <strong>Market:</strong> {company.voteResults.marketScoreAvg} <br />
        <strong>Product:</strong> {company.voteResults.productScoreAvg} <br />
        <strong>Team:</strong> {company.voteResults.teamScoreAvg} <br />
        <strong>Fit:</strong> {company.voteResults.fitScoreAvg} <br />
      </Card.Text>
    </Card.Body>
  </Card>
);
