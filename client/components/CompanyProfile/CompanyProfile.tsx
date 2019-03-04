import dayjs from 'dayjs';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import { Company } from '../../schemas/company';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';

export interface CompanyProfileProps {
  company: Company;
}

export default ({ company }: CompanyProfileProps) => {
  return (
    <>
      <Row className="mt-5">
        <Col md="8">
          <h1>{company.name}</h1>
          <small>
            <em>
              Last edited{' '}
              {dayjs(company.updated_at).format('MMMM D, YYYY [at] h:mm a')}
            </em>
          </small>
        </Col>
        <Col md={{ offset: 2, width: 2 }}>
          <Button variant="primary">Edit</Button>
          &nbsp;
          <Button variant="secondary">Archive</Button>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          {company.tags &&
            company.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </Col>
        <Col md="2">
          <small>Application Date</small>
          <br />
          <strong>{dayjs(company.created_at).format('MMMM D, YYYY')}</strong>
        </Col>
        <Col md="2" className="text-right">
          <small>Partners</small>
          <br />
          <PartnerAssigner company={company} />
        </Col>
      </Row>
      <Row>
        <Col md="8">
          {company.company_links && (
            <p>
              {company.company_links.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              ))}
            </p>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="8">{company.description}</Col>
        <Col md="4">Status: {company.status}</Col>
      </Row>
    </>
  );
};
