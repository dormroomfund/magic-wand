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
}

interface CompanyState {
  company: Company;
  loading: any;
}

export default class CompanyPage extends React.Component<
  CompanyProps,
  CompanyState
> {
  state = {
    company: {} as Company,
    loading: false,
  };

  static async getInitialProps(ctx: NextContext) {
    requireLoggedIn()(ctx);
    return ctx.query;
  }

  async componentDidMount() {
    const company = await client.service('api/companies').get(this.props.id);
    this.setState({ company, loading: false });
    // TODO: Error Handling
  }

  handleSubmit = async (evt: ISubmitEvent<any>) => {
    try {
      const res = await client
        .service('api/companies')
        .patch(this.props.id, evt.formData);
    } catch (e) {
      console.error(e);
    }

    alert('done');
  };

  render() {
    // TODO: Fancier loading screen.
    const { company, loading } = this.state;

    return (
      <FullWidthLayout>
        {loading && <div>Loading...</div>}
        {company ? <CompanyProfile company={company} /> : 'Error'}
      </FullWidthLayout>
    );
  }
}
