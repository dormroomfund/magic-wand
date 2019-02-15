import React from 'react';
import Layout from '../components/Layout/Layout';

export default class Vote extends React.Component {
  static async getInitialProps({ query }) {
    return query;
  }

  render() {
    return (
      <Layout>
        <p> Company! </p>
      </Layout>
    );
  }
}
