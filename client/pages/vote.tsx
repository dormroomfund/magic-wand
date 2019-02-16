import React from 'react';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { UnreachableCaseError } from '../lib/errors';
import VotingForms from '../components/Voting/voting';

interface VoteProps {
  id: number /* Company Id */;
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
                  <VotingForms companyID={this.props.id} user={uc.user} />
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
