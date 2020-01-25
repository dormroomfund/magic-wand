import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Card from 'react-bootstrap/lib/Card';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import { Link } from '../../routes';
import { Company } from '../../schemas/company';

export interface ResearchListProps {
  companies: Company[];
  onRestoreCompany?: (number) => void;
  onArchiveCompany?: (number) => void;
}

export default ({ companies }: ResearchListProps) => (
  <>
    {companies.map((company) => (
      <Card key={company.id} style={{ marginBottom: '1rem', width: '25rem' }}>
        <Card.Body>
          <Card.Title>{company.name}</Card.Title>
          <Card.Text>
            {company.description} <br />
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            {' '}
            <strong>Status: </strong> {company.status}{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            <strong>Date: </strong> {company.pitchDate}{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            <strong>Team: </strong> {company.team}{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            {' '}
            <strong>Tags: </strong> {company.industries.toString()}{' '}
          </ListGroup.Item>
          <ListGroup.Item>
            <Link route="company" params={{ id: company.id }}>
              <Button variant="primary">View Page</Button>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    ))}
  </>
);
