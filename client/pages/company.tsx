import React from "react";
import axios from "axios";
import styled from "styled-components";

import Spinner from "../components/Spinner/Spinner";
import Layout from '../components/Layout/Layout';
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
  match: any,
  id: any
}

interface CompanyState {
  response: any,
  loading: any
}

const axios_config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};

export default class Company extends React.Component<CompanyProps, CompanyState> {
  static async getInitialProps({query}) {
    return query
  }

  state = {
    response: {},
    loading: false
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3000/api/companies/${this.props.id}`, axios_config
      )
      .then(response => {
        this.setState({ response: response.data, loading: false });
      })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <Layout>
        <div>
          {this.state.loading ?
            <div> Loading </div>
           : (
            <CompanyLayout>
              <LeftSection props={this.state.response} />
              <RightSection props={this.state.response} />
            </CompanyLayout>
          )}
        </div>
      </Layout>
    );
  }
}
