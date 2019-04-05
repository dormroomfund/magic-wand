import React from 'react';
import { Subscribe } from 'unstated';
import PipelineLayout from '../components/Layout/PipelineLayout';
import Onboarding from '../components/Onboarding/Onboarding';
import Kanban from '../components/Pipeline/Kanban';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { UnreachableCaseError } from '../lib/errors';
import { requireLoggedIn } from '../lib/routing';

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
            <PipelineLayout>
              {uc.isInitialized ? <Kanban user={uc.user} /> : <Onboarding />}
            </PipelineLayout>
          );
        default:
          throw new UnreachableCaseError(uc.authState);
      }
    }}
  </Subscribe>
);

PipelinePage.getInitialProps = requireLoggedIn();

export default PipelinePage;
