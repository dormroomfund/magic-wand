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
import LinksViewer from './LinksViewer/LinksViewer';
import AttachmentDropdown from './AttachmentDropdown';

export interface CompanyProfileProps {
  companyId: number;
}

const Wrapper = styled.div`
  margin-top: -1em;
`;

const Header = styled.div`
  padding: 3vh 5vw;
  background-color: ${colors.$N5};
  max-width: none !important;
  width: 100vw !important;
`;

const HeaderRow = styled(Row)`
  padding: 1vh 0vw;
  background-color: ${colors.$N5};

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

const StatusWrapper = styled.div`
  margin-bottom: 1%;
  background-color: #f2f2f4;
  padding: 5% 7%;
`;

const StatusBold = styled.span`
  font-weight: bold;
`;

const StatusButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5%;

  .pitchdate {
    margin-right: 25%;

    span {
      font-size: 0.9rem;
      color: #0702d1;
      font-weight: bold;
    }
  }

  button {
    background-color: #12a577;
  }
`;

const CompanyDetails = styled(Container)`
  padding: 4vh 5vw;
  max-width: 100vw;
`;

const CompanyDetails2 = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 100%;
`;

const MainDetails = styled(Col)`
  width: 55%;
  padding-right: 2.5%;
`;

const SideBarDetails = styled(Col)`
  width: 35%;
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
        <Header>
          <HeaderRow>
            <Col md="8">
              <h1>{company.name}</h1>
              <small>
                <em className="color-N50">
                  Last edited on&nbsp;
                  {dayjs(company.updatedAt).format('MMMM D, YYYY [at] h:mm a')}
                </em>
              </small>
            </Col>
            <Col
              md={{ offset: 2, width: 2 }}
              className="float-right text-right"
            >
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
              {company.status === Status.Pitching && (
                <>
                  <small>Pitch Date</small> <br />
                  <p>{dayjs(company.pitchDate).format('MMMM D, YYYY')}</p>
                </>
              )}
            </Col>
          </HeaderRow>
          <HeaderRow className="lastrow">
            <Col md="8">
              <AttachmentDropdown links={company.companyLinks} />
            </Col>
            <Col md="2" className="float-right text-right">
              <small>Links</small>
              <br />
              <LinksViewer companyId={company.id} />
            </Col>
            <Col md="2" className="float-right text-right">
              <small>Partners</small>
              <br />
              <PartnerAssigner companyId={company.id} />
            </Col>
          </HeaderRow>
        </Header>
        <CompanyDetails>
          <CompanyDetails2>
            <MainDetails md="8" className="mainbody">
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
            </MainDetails>
            <SideBarDetails md="4">
              <StatusWrapper>
                <small>Status:&nbsp;</small>
                <StatusBold>{company.status}</StatusBold>
                {pitchedStates.includes(company.status) ? (
                  <VoteResults company={company} />
                ) : null}
                {company.status === Status.Pitching && (
                  <StatusButtonWrapper>
                    {company.pitchDate && (
                      <div className="pitchdate">
                        <small>Pitch Date:&nbsp;</small>
                        <span>
                          {dayjs(company.pitchDate).format('MMMM D, YYYY')}
                        </span>
                      </div>
                    )}
                    <PitchDateSelector
                      companyId={company.id}
                      hideText={(props) => (
                        <Button variant="secondary" size="sm" {...props}>
                          Select Pitch Date
                        </Button>
                      )}
                      showText={(props) => (
                        <Button variant="secondary" size="sm" {...props}>
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
                        <Button variant="success" size="sm" {...props}>
                          Change
                        </Button>
                      )}
                    />
                  </StatusButtonWrapper>
                )}
              </StatusWrapper>
              <CompanyComments companyId={company.id} />
            </SideBarDetails>
          </CompanyDetails2>
        </CompanyDetails>
      </Wrapper>
    );
  }
);
