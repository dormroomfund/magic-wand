import dayjs from 'dayjs';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import styled from 'styled-components';
import { Company } from '../../schemas/company';
import colors from '../../stylesheets/colors.json';

import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';
import FounderGroup from './FounderGroup';

export interface CompanyProfileProps {
  company: Company;
}

const HeaderRow = styled(Row)`
  background-color: ${colors.$N5};
  max-width: none !important;
  padding: 1vh 5vw;
  width: 100vw !important;

  &:first-child {
    padding-top: 12.5vh !important;
  }
`;

const BodyRow = styled(Row)`
  max-width: none !important;
  padding: 1vh 5vw;
  width: 100vw !important;
`;

const CompanyQuestion = styled.div`
  padding-top: 1%;
  padding-bottom: 1.5%;

  small {
    color: ${colors.$N50};
  }
`;

export default ({ company }: CompanyProfileProps) => (
  <div>
    <HeaderRow>
      <Col md="8">
        <h1>{company.name}</h1>
        <small>
          <em className="color-N50">
            Last edited &nbsp;
            {dayjs(company.updatedAt).format('MMMM D, YYYY [at] h:mm a')}
          </em>
        </small>
      </Col>
      <Col md={{ offset: 2, width: 2 }}>
        <Button variant="info">Edit</Button>
        &nbsp;
        <Button variant="warning">Archive</Button>
      </Col>
    </HeaderRow>
    <HeaderRow>
      <Col md="8">
        {company.tags &&
          company.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </Col>
      <Col md="2">
        <small>Application Date</small>
        <br />
        <strong>{dayjs(company.createdAt).format('MMMM D, YYYY')}</strong>
      </Col>
      <Col md="2">
        <small>Pitch Date</small>
        <br />
        <strong>{dayjs(company.createdAt).format('MMMM D, YYYY')}</strong>
      </Col>
    </HeaderRow>
    <HeaderRow>
      <Col md="8">
        {company.companyLinks && (
          <p>
            {company.companyLinks.map(({ name, url }) => (
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
      <Col md="2">
        <small>Links</small>
      </Col>
      <Col md="2">
        <small>Partners</small>
        <br />
        <PartnerAssigner company={company} />
      </Col>
    </HeaderRow>
    <BodyRow>
      <Col md="8">
        <CompanyQuestion>
          <small>Description</small>
          <br />
          {company.description}
        </CompanyQuestion>
        <CompanyQuestion>
          <small>What’s unique about your startup?</small>
          <br />
        </CompanyQuestion>
        <CompanyQuestion>
          <small>Where are you in your fundraising process?</small>
          <br />
        </CompanyQuestion>
        <CompanyQuestion>
          <small>Were you referred by someone in the DRF community?</small>
          <br />
        </CompanyQuestion>
        <FounderGroup />
      </Col>
      <Col md="4">
        Status:
        {company.status}
      </Col>
    </BodyRow>
  </div>
);
