import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Subscribe } from 'unstated';
import ArchiveContainer from '../../containers/ArchiveContainer';

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
                </Card.Body>
              </Card>
            ))
          }
        </Subscribe>
      </Col>
    </Row>
  );
};
