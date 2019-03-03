import { JSONSchema6 } from 'json-schema';
import { NextContext } from 'next';
import Head from 'next/head';
import React from 'react';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import Layout from '../components/Layout/Layout';
import client from '../lib/client';
import { requireLoggedIn } from '../lib/routing';
import { companySchema, Company } from '../schemas/company';
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';

const companyUiSchema = {
  description: {
    'ui:widget': 'textarea',
  },
};

interface CompanyProps {
  match: any;
  id: any;
}

interface CompanyState {
  company: Company;
  loading: any;
}

export default class CompanyPage extends React.Component<
  CompanyProps,
  CompanyState
> {
  static async getInitialProps(ctx: NextContext) {
    requireLoggedIn()(ctx);
    return ctx.query;
  }

  state = {
    company: {} as Company,
    loading: false,
  };

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
      console.dir('handleSubmit', res);
    } catch (e) {
      console.error(e);
    }

    alert('done');
  };

  render() {
    // TODO: Fancier loading screen.
    const { company, loading } = this.state;

    return (
      <Layout>
        {loading ? (
          <div>Loading...</div>
        ) : company ? (
          <CompanyProfile company={company} />
        ) : (
          'Error'
        )}
      </Layout>
    );
  }
}
