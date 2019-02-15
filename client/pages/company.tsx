import Head from 'next/head';
import React from 'react';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import Layout from '../components/Layout/Layout';
import client from '../lib/client';
import schema from '../shared/schema';

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
  static async getInitialProps({ query }) {
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
              schema={schema.companies}
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
