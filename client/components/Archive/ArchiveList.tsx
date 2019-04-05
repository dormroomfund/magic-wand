import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Card from 'react-bootstrap/lib/Card';
import { Link } from '../../routes';
import { archivedStates, Company } from '../../schemas/company';

export interface ArchiveListProps {
  companies: Company[];
  onRestoreCompany?: (number) => void;
  onArchiveCompany?: (number) => void;
}

export default ({
  companies,
  onRestoreCompany,
  onArchiveCompany,
}: ArchiveListProps) => (
  <>
    {companies.map((company) => (
      <Card key={company.id}>
        <Card.Body>
          <Card.Title>{company.name}</Card.Title>
          <Card.Text>{company.description}</Card.Text>
          <ButtonGroup>
            <Link route="company" params={{ id: company.id }}>
              <Button variant="primary">View</Button>
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
    ))}
  </>
);
