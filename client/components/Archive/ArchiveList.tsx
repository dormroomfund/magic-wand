import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Card from 'react-bootstrap/lib/Card';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Subscribe } from 'unstated';
import ArchiveContainer from '../../containers/ArchiveContainer';
import { Link } from '../../routes';

export default () => {
  return (
    <Row>
      <Col md={{ offset: 2, width: 8 }}>
        <Subscribe to={[ArchiveContainer]}>
          {(ac: ArchiveContainer) =>
            ac.companies.map((company) => (
              <Card key={company.id}>
                <Card.Body>
                  <Card.Title>{company.name} </Card.Title>
                  <Card.Text>{company.description}</Card.Text>
                  <ButtonGroup>
                    <Link route="company" params={{ id: company.id }}>
                      <Button variant="primary">View</Button>
                    </Link>
                    {company.archived ? (
                      <Button
                        variant="info"
                        onClick={() => ac.restoreCompany(company.id)}
                      >
                        Restore
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => ac.archiveCompany(company.id)}
                      >
                        Archive
                      </Button>
                    )}
                  </ButtonGroup>
                </Card.Body>
              </Card>
            ))
          }
        </Subscribe>
      </Col>
    </Row>
  );
};
