import React from 'react';
import { Subscribe } from 'unstated';
import PipelineLayout from '../components/Layout/PipelineLayout';
import Onboarding from '../components/Onboarding/Onboarding';
import Kanban from '../components/Pipeline/Kanban';
import CurrentUserContainer, {
  AuthState,
} from '../containers/CurrentUserContainer';
import { UnreachableCaseError } from '../lib/errors';
import { requireLoggedIn } from '../lib/routing';

const PipelinePage = ({ id }) => (
  <Subscribe to={[CurrentUserContainer]}>
    {(cuc: CurrentUserContainer) => {
      switch (cuc.authState) {
        case AuthState.LoggedOut:
          return null;
        case AuthState.LoggingIn:
          return null;
        case AuthState.LoggedIn:
          return (
            <PipelineLayout>
              {cuc.isInitialized ? <Kanban user={cuc.user} /> : <Onboarding />}
            </PipelineLayout>
          );
        default:
          throw new UnreachableCaseError(cuc.authState);
      }
    }}
  </Subscribe>
);

PipelinePage.getInitialProps = requireLoggedIn();

export default PipelinePage;
