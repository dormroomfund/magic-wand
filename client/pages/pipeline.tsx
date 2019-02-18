import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineLayout from '../components/Layout/PipelineLayout';
import Onboarding from '../components/Onboarding/Onboarding';
import Kanban from '../components/Pipeline/Kanban';
import UserContainer, { AuthState } from '../containers/UserContainer';
import { getUser } from '../lib/authentication';
import { UnreachableCaseError } from '../lib/errors';
import { redirect, requireLoggedIn } from '../lib/routing';
import { Link } from '../routes';
import styled from 'styled-components';

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
