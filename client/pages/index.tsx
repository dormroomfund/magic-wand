import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import CurrentUserContainer, {
  AuthState,
} from '../containers/CurrentUserContainer';
import { Router } from '../routes';
import { UnreachableCaseError } from '../lib/errors';

export default () => (
  <Layout>
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="mt-5 text-center">
          Magic Wand{' '}
          <span role="img" aria-label="hat">
            🎩
          </span>
        </h1>
        <Subscribe to={[CurrentUserContainer]}>
          {(cuc: CurrentUserContainer) => {
            switch (cuc.authState) {
              case AuthState.LoggedOut:
                return (
                  <Button block size="lg" href="/auth/auth0" className="mt-2">
                    Log In
                  </Button>
                );
              case AuthState.LoggingIn:
                return null;
              case AuthState.LoggedIn:
                return (
                  <Button
                    onClick={() => Router.pushRoute('/pipeline')}
                    block
                    size="lg"
                    className="mt-2"
                  >
                    Proceed to Pipeline
                  </Button>
                );
              default:
                throw new UnreachableCaseError(cuc.authState);
            }
          }}
        </Subscribe>
      </Col>
    </Row>
  </Layout>
);
