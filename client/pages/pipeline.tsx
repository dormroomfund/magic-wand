import React from 'react';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import Onboarding from '../components/Onboarding/Onboarding';
import Kanban from '../components/Pipeline/Kanban';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { UnreachableCaseError } from '../lib/errors';
import Button from 'react-bootstrap/lib/Button';
import { Link } from '../routes';

export default ({ id }) => (
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
              {uc.isInitialized ? <Kanban user={uc.user} /> : <Onboarding />}
            </Layout>
          );
        default:
          throw new UnreachableCaseError(uc.authState);
      }
    }}
  </Subscribe>
);
