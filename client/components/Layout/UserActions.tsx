import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { Subscribe } from 'unstated';
import UserContainer, { AuthState } from '../../containers/UserContainer';
import { UnreachableCaseError } from '../../lib/errors';
import { Link, Router } from '../../routes';

export default () => (
  <Subscribe to={[UserContainer]}>
    {(uc: UserContainer) => {
      switch (uc.authState) {
        case AuthState.LoggedOut:
          return <Nav.Link href="/auth/auth0">Log In</Nav.Link>;
        case AuthState.LoggingIn:
          return null;
        case AuthState.LoggedIn:
          return (
            <NavDropdown
              title={uc.state.user && uc.state.user.email}
              id="navbar-auth-dropdown"
            >
              <NavDropdown.Item onClick={() => Router.pushRoute('/settings')}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => uc.logOut()}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          );
        default:
          throw new UnreachableCaseError(uc.authState);
      }
    }}
  </Subscribe>
);
