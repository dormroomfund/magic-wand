import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import { Subscribe } from 'unstated';
import Research from '../components/Research/Research';
import PipelineLayout from '../components/Layout/PipelineLayout';
import { requireLoggedIn } from '../lib/routing';
import { UnreachableCaseError } from '../lib/errors';
import Onboarding from '../components/Onboarding/Onboarding';
import CurrentUserContainer, {
  AuthState,
} from '../containers/CurrentUserContainer';

const ResearchPage = () => (
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
              <Row>
                {cuc.isInitialized ? (
                  <Research user={cuc.user} />
                ) : (
                  <Onboarding />
                )}
              </Row>
            </PipelineLayout>
          );
        default:
          throw new UnreachableCaseError(cuc.authState);
      }
    }}
  </Subscribe>
);

ResearchPage.getInitialProps = requireLoggedIn();

export default ResearchPage;
