import { JSONSchema6 } from 'json-schema';
import Head from 'next/head';
import React from 'react';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import Layout from '../components/Layout/Layout';
import { getUser } from '../lib/authentication';
import client from '../lib/client';
import { redirect } from '../lib/routing';
import { companySchema } from '../schemas/company';

interface CompanyProps {
  match: any;
  id: any;
}

interface CompanyState {
  company: any;
  loading: any;
}

export default class Company extends React.Component<
  CompanyProps,
  CompanyState
> {
  static async getInitialProps({ query, req, res }) {
    const user = await getUser(req);
    if (!user) {
      redirect('/', res);
      return;
    }

    return query;
  }

  state = {
    company: {},
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

    console.log('render', loading, company);

    return (
      <Layout>
        <Head>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          />
        </Head>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : company ? (
            <Form
              schema={companySchema as JSONSchema6}
              formData={company}
              onSubmit={this.handleSubmit}
            />
          ) : (
            'Error'
          )}
        </div>
      </Layout>
    );
  }
}
