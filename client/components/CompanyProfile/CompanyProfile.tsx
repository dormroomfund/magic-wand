import dayjs from 'dayjs';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import styled from 'styled-components';
import { getAnswerValueFromRef, refsMap } from '../../lib/typeform';
import { Company, pitchedStates } from '../../schemas/company';
import colors from '../../stylesheets/colors.json';
import CompanyComments from '../CompanyComments/CompanyComments';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';
import FounderGroup from './FounderGroup';
import VoteResults from './VoteResults';

export interface CompanyProfileProps {
  company: Company;
}

const HeaderRow = styled(Row)`
  background-color: ${colors.$N5};
  max-width: none !important;
  padding: 1vh 5vw;
  width: 100vw !important;

  &:first-child {
    padding-top: 13vh !important;
  }

  small {
    color: ${colors.$N50};
  }
`;

const CompanyQuestion = styled.div`
  padding-top: 1%;
  padding-bottom: 1.5%;
  width: 100%;

  small {
    color: ${colors.$N50};
  }
`;

const InfoButton = styled(Button)`
  background-color: #0702d1;
  border: none;
  border-width: 0px !important;
`;

const WarningButton = styled(Button)`
  background-color: #feab06;
  border: none;
  border-width: 0px !important;
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
      <Col md={{ offset: 2, width: 2 }} className="float-right text-right">
        <InfoButton>Edit</InfoButton>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <WarningButton>Archive</WarningButton>
      </Col>
    </HeaderRow>
    <HeaderRow>
      <Col md="8">
        {company.tags &&
          company.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
      </Col>
      <Col md="2" className="float-right text-right">
        <small>Application Date</small>
        <br />
        <p>{dayjs(company.createdAt).format('MMMM D, YYYY')}</p>
      </Col>
      <Col md="2" className="float-right text-right">
        <small>Pitch Date</small>
        <br />
        <p>{dayjs(company.createdAt).format('MMMM D, YYYY')}</p>
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
      <Col md="2" className="float-right text-right">
        <small>Links</small>
      </Col>
      <Col md="2" className="float-right text-right">
        <small>Partners</small>
        <br />
        <PartnerAssigner company={company} />
      </Col>
    </HeaderRow>
    <Container>
      <Row>
        <Col md="8" className="mainbody">
          <CompanyQuestion>
            <small>Description</small>
            <br />
            {company.description}
          </CompanyQuestion>
          <CompanyQuestion>
            <small>What’s unique about your startup?</small>
            <br />
            {getAnswerValueFromRef(company.typeformData, refsMap.uniqueness)}
          </CompanyQuestion>
          <CompanyQuestion>
            <small>Where are you in your fundraising process?</small>
            <br />
            {getAnswerValueFromRef(
              company.typeformData,
              refsMap.fundraising_process
            )}
          </CompanyQuestion>
          <CompanyQuestion>
            <small>Were you referred by someone in the DRF community?</small>
            <br />
            {getAnswerValueFromRef(company.typeformData, refsMap.referral)}
          </CompanyQuestion>
          <FounderGroup company={company} />
        </Col>
        <Col md="4">
          <small>Status&nbsp;</small>
          <span>{company.status}</span>
          {pitchedStates.includes(company.status) ? (
            <VoteResults company={company} />
          ) : null}
          <CompanyComments companyId={company.id} />
        </Col>
      </Row>
    </Container>
  </div>
);
