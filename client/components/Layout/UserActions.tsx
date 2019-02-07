import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import UserContainer, { AuthState } from '../../containers/UserContainer';
import { Subscribe } from 'unstated';
import Nav from 'react-bootstrap/lib/Nav';
import Link from 'next/link';
import { UnreachableCaseError } from '../../lib/errors';

export default () => (
  <Subscribe to={[UserContainer]}>
    {(uc: UserContainer) => {
      switch (uc.authState) {
        case AuthState.LoggedOut:
          return (
            <Link>
              <a>
                <Nav.Link href="/auth/auth0">Log In</Nav.Link>
              </a>
            </Link>
          );
        case AuthState.LoggingIn:
          return null;
        case AuthState.LoggedIn:
          return (
            <NavDropdown
              title={uc.state.user && uc.state.user.email}
              id="navbar-auth-dropdown"
            >
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
