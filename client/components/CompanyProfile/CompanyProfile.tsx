import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import styled from 'styled-components';
import {
  ApplicationContainerProps,
  withAC,
} from '../../containers/ApplicationContainer';
import { getAnswerValueFromRef, refsMap } from '../../lib/typeform';
import { pitchedStates, Status } from '../../schemas/company';
import colors from '../../stylesheets/colors.json';
import CompanyComments from '../CompanyComments/CompanyComments';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';
import PitchDateSelector from '../PitchDateSelector/PitchDateSelector';
import FounderGroup from './FounderGroup';
import VoteResults from './VoteResults';
import PartnerTeamDropdown from './PartnerTeamDropdown';
import { Team } from '../../schemas/common';

export interface CompanyProfileProps {
  companyId: number;
}

const Wrapper = styled.div`
  margin-top: -1em;
`;

const HeaderRow = styled(Row)`
  background-color: ${colors.$N5};
  max-width: none !important;
  padding: 1vh 5vw;
  width: 100vw !important;

  &:first-child {
    padding-top: 2em !important;
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

export default withAC(
  ({
    applicationContainer: ac,
    companyId,
  }: CompanyProfileProps & ApplicationContainerProps) => {
    useEffect(
      () => {
        ac.companies.retrieve(companyId);
      },
      [ac.companies, companyId]
    );

    const company = ac.companies.get(companyId);
    if (!company) {
      return <span>Loading...</span>;
    }

    return (
      <Wrapper>
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
            {company.status === Status.Pitching && (
              <>
                <small>Pitch Date</small> <br />
                <p>{dayjs(company.pitchDate).format('MMMM D, YYYY')}</p>
              </>
            )}
          </Col>
          <Col md="2" className="float-right text-right">
            <small>Partner Team</small>
            <PartnerTeamDropdown
              partnerTeams={Object.values(Team)}
              companyId={company.id}
              currentPartnerTeam={company.team}
            />
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
            <PartnerAssigner companyId={company.id} />
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
                {getAnswerValueFromRef(
                  company.typeformData,
                  refsMap.uniqueness
                )}
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
                <small>
                  Were you referred by someone in the DRF community?
                </small>
                <br />
                {getAnswerValueFromRef(company.typeformData, refsMap.referral)}
              </CompanyQuestion>
              <FounderGroup company={company} />
            </Col>
            <Col md="4">
              <section>
                <small>Status&nbsp;</small>
                <span>{company.status}</span>
                {pitchedStates.includes(company.status) ? (
                  <VoteResults company={company} />
                ) : null}
                {company.status === Status.Pitching && (
                  <p>
                    {company.pitchDate && (
                      <>
                        <small>Pitch Date&nbsp;</small>
                        <span>
                          {dayjs(company.pitchDate).format('MMMM D, YYYY')}
                        </span>
                      </>
                    )}
                    <PitchDateSelector
                      companyId={company.id}
                      hideText={(props) => (
                        <Button
                          variant="secondary"
                          className="float-right"
                          size="sm"
                          {...props}
                        >
                          Select Pitch Date
                        </Button>
                      )}
                      showText={(props) => (
                        <Button
                          variant="secondary"
                          className="float-right"
                          size="sm"
                          {...props}
                        >
                          <span
                            role="img"
                            title="Cancel Setting Pitch Date"
                            aria-label="cancel set pitch date button"
                          >
                            ❌
                          </span>
                        </Button>
                      )}
                      selectedText={(props) => (
                        <Button
                          variant="success"
                          className="float-right"
                          size="sm"
                          {...props}
                        >
                          Change
                        </Button>
                      )}
                    />
                  </p>
                )}
              </section>
              <CompanyComments companyId={company.id} />
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
);
