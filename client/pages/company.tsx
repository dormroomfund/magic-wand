import { NextContext } from 'next';
import React from 'react';
import { ISubmitEvent } from 'react-jsonschema-form-bs4';
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';
import FullWidthLayout from '../components/Layout/FullWidthLayout';
import client from '../lib/client';
import { requireLoggedIn } from '../lib/routing';
import { Company } from '../schemas/company';

interface CompanyProps {
  id: string;
  company: Company;
}

interface CompanyState {
  loading: boolean;
}

export default class CompanyPage extends React.Component<
  CompanyProps,
  CompanyState
> {
  state: CompanyState = {
    loading: true,
  };

  static async getInitialProps(ctx: NextContext) {
    requireLoggedIn()(ctx);
    const company = await client.service('api/companies').get(+ctx.query.id);
    return { ...ctx.query, company };
  }

  async componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    // TODO: Fancier loading screen.
    const { loading } = this.state;

    return (
      <FullWidthLayout>
        {this.props.company ? (
          <CompanyProfile company={this.props.company} />
        ) : (
          'Error'
        )}
      </FullWidthLayout>
    );
  }
}
