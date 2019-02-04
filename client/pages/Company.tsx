import React from "react";
import axios from "axios";
import styled from "styled-components";

import Spinner from "../components/Spinner/Spinner";
import LeftSection from "../components/Company/DetailedView/LeftSection";
import RightSection from "../components/Company/DetailedView/RightSection";

const NavLine = styled.hr`
  width: 90vw;
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid black;
  padding: 0;
`;

const CompanyLayout = styled.div`
  &&& {
    font-size: 16px;
    color: black;
  }

  display: grid;
  margin: 1% 5% 1% 5%;
  grid-template-columns: 55vw 40vw;
  align-items: center;

  &&& .tag {
    height: 26px;
    padding: 2px 9px;
    font-size: 16px;
  }
`;

interface CompanyProps {
  match: any
}

interface CompanyState {
  response: any,
  loading: any
}

// TODO: Needs to be integrated with Next routing. Not sure how to do this yet.
export default class Company extends React.Component<CompanyProps, CompanyState> {
  static async getInitialProps({query}) {
    console.log(query);
  }

  constructor(props) {
    super(props);
    this.state = { response: "", loading: true };
  }

  componentDidMount() {
    axios
      .get(
        `https://drfvote-magicwand.herokuapp.com/api/v2/companies/1?include=team,pitches,partners,founders`
      )
      .then(response => {
        this.setState({ response: response.data.data, loading: false });
      });
    // .catch(error => {
    //   console.log(error);
    // });
  }

  render() {
    return (
      <div>
        <NavLine />
        {this.state.loading ? (
          {/*<Spinner />*/}
        ) : (
          <CompanyLayout>
            <LeftSection props={this.state.response} />
            <RightSection props={this.state.response} />
          </CompanyLayout>
        )}
      </div>
    );
  }
}
