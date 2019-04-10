/* Displays the voting Results of a company */
import Card from 'react-bootstrap/lib/Card';
import React from 'react';
import { Company } from '../../schemas/company';

export interface VotingResultsProps {
  company: Company;
}

export default ({ company }: VotingResultsProps) => (
  <Card>
    <Card.Body>
      <Card.Title>
        {company.voteResults.numYes > company.voteResults.numNo ? (
          <p> Funded </p>
        ) : (
          <p> Rejected </p>
        )}
      </Card.Title>
      <Card.Text>
        <p>
          {company.voteResults.numYes} in favor, {company.voteResults.numNo}{' '}
          against{' '}
        </p>
        <p> {company.team} </p>
        <strong>Market:</strong> {company.voteResults.marketScoreAvg} <br />
        <strong>Product:</strong> {company.voteResults.productScoreAvg} <br />
        <strong>Team:</strong> {company.voteResults.teamScoreAvg} <br />
        <strong>Fit:</strong> {company.voteResults.fitScoreAvg} <br />
      </Card.Text>
    </Card.Body>
  </Card>
);
