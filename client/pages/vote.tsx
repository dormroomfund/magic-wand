import { NextContext } from 'next';
import React from 'react';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import Voting from '../components/Voting/Voting';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { UnreachableCaseError } from '../lib/errors';
import { requireLoggedIn } from '../lib/routing';

interface VoteProps {
  id: number /* CompanyCard Id */;
}

export default class Vote extends React.Component<VoteProps> {
  static async getInitialProps({ query }) {
    return query;
  }

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(uc: UserContainer) => {
          switch (uc.authState) {
            case AuthState.LoggedOut:
              return null;
            case AuthState.LoggingIn:
              return null;
            case AuthState.LoggedIn:
              return (
                <Layout>
                  <Voting companyID={this.props.id} />
                </Layout>
              );
            default:
              throw new UnreachableCaseError(uc.authState);
          }
        }}
      </Subscribe>
    );
  }
}
