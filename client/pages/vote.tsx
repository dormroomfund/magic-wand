import { NextContext } from 'next';
import React from 'react';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import VotingForms from '../components/Voting/voting';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { UnreachableCaseError } from '../lib/errors';
import { requireLoggedIn } from '../lib/routing';

interface VoteProps {
  id: number /* Company Id */;
}

export default class Vote extends React.Component<VoteProps> {
  static async getInitialProps(ctx: NextContext) {
    if (requireLoggedIn()(ctx)) return;
    return ctx.query;
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
