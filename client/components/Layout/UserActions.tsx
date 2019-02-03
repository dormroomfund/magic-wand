import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
<<<<<<< HEAD
import UserContainer, { AuthState } from '../../containers/UserContainer';
import { Subscribe } from 'unstated';
import Nav from 'react-bootstrap/lib/Nav';
import Link from 'next/link';

export default () => (
  <Subscribe to={[UserContainer]}>
    <NavDropdown title="<e-mail address>" id="user-actions-drop">
      <NavDropdown.Item>Log Out</NavDropdown.Item>
    </NavDropdown>
    );
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {uc.state.user && uc.state.user.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => uc.logOut()}>Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        default:
          throw new UnreachableCaseError(uc.authState);
      }
    }}
  </Subscribe>
=======

export default () => (
  <NavDropdown title="<e-mail address>" id="user-actions-drop">
    <NavDropdown.Item>Log Out</NavDropdown.Item>
  </NavDropdown>
>>>>>>> master
);
