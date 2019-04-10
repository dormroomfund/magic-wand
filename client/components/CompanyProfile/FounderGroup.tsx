import React from 'react';
import styled from 'styled-components';
import { getAnswerValueFromRef, refsMap } from '../../lib/typeform';
import { Company } from '../../schemas/company';
import colors from '../../stylesheets/colors.json';

const Wrapper = styled.div`
  background: ${colors.$N5};
  padding: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Founder = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 87.5%;
  }

  p {
    margin: 0 !important;
  }
`;

const FounderIcon = styled.div`
  && {
    width: 7.5%;
  }

  img {
    width: 100%;
    margin-right: 5% !important;
  }
`;

const BylineText = styled.p`
  font-family: CircularStd-Book, Helvetica, Arial, sans-serif !important;
  font-size: 0.8rem !important;
  color: ${colors.$N50};
  line-height: 150%;
`;

export interface FounderGroupProps {
  company: Company;
}

export default class FounderGroup extends React.Component<FounderGroupProps> {
  render() {
    const founders = getAnswerValueFromRef(
      this.props.company.typeformData,
      refsMap.founders
    ).split(',');
    const linkedins = getAnswerValueFromRef(
      this.props.company.typeformData,
      refsMap.linkedins
    ).split(',');
    const schools = getAnswerValueFromRef(
      this.props.company.typeformData,
      refsMap.schools
    );
    const genderBreakdown = getAnswerValueFromRef(
      this.props.company.typeformData,
      refsMap.gender_breakdown
    );
    const raceOrEthnicity = getAnswerValueFromRef(
      this.props.company.typeformData,
      refsMap.race_or_ethnicity
    );

    return (
      <Wrapper>
        {founders.map((founder) => (
          <Founder>
            <FounderIcon>
              <img src="/static/Founder_Icon.png" />
            </FounderIcon>
            <div>
              <BylineText>
                <a href=""> {founder}</a>
              </BylineText>
            </div>
          </Founder>
        ))}
        {/* <p> Linkedins </p> */}
        {/* { */}
        {/* linkedins.map( (linkedin) => { */}
        {/* return ( */}
        {/* <p> {linkedin} </p> */}
        {/* ) */}
        {/* }) */}
        {/* } */}
      </Wrapper>
    );
  }
}
