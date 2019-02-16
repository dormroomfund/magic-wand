import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Card from 'react-bootstrap/lib/Card';
import { Subscribe } from 'unstated';
import ArchiveContainer from '../../containers/ArchiveContainer';
import UserContainer from '../../containers/UserContainer';
import { Link } from '../../routes';

export interface ArchiveListProps {
  companies: any[];
  onRestoreCompany?: (number) => void;
  onArchiveCompany?: (number) => void;
}

export default ({
  companies,
  onRestoreCompany,
  onArchiveCompany,
}: ArchiveListProps) => {
  return (
    <>
      {companies.map((company) => (
        <Card key={company.id}>
          <Card.Body>
            <Card.Title>{company.name} </Card.Title>
            <Card.Text>{company.description}</Card.Text>
            <ButtonGroup>
              <Link route="company" params={{ id: company.id }}>
                <Button variant="primary">View</Button>
              </Link>
              {company.archived
                ? onRestoreCompany && (
                    <Button
                      variant="info"
                      onClick={() => onRestoreCompany(company.id)}
                    >
                      Restore
                    </Button>
                  )
                : onArchiveCompany && (
                    <Button
                      variant="danger"
                      onClick={() => onArchiveCompany(company.id)}
                    >
                      Archive
                    </Button>
                  )}
            </ButtonGroup>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
