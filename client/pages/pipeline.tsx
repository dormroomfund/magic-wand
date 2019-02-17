import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import Onboarding from '../components/Onboarding/Onboarding';
import Kanban from '../components/Pipeline/Kanban';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { getUser } from '../lib/authentication';
import { UnreachableCaseError } from '../lib/errors';
import { redirect } from '../lib/routing';
import { Link } from '../routes';

const PipelinePage = ({ id }) => (
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

PipelinePage.getInitialProps = async ({ req, res }) => {
  const user = await getUser(req);
  if (!user) {
    redirect('/', res);
    return;
  }
};

export default PipelinePage;
