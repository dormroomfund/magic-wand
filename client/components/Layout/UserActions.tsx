import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { Subscribe } from 'unstated';
import UserContainer, { AuthState } from '../../containers/UserContainer';
import { UnreachableCaseError } from '../../lib/errors';
import { Link, Router } from '../../routes';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavLink from 'react-bootstrap/lib/NavLink';

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
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink} id="navbar-auth-dropdown">
                {uc.state.user && uc.state.user.email}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => Router.pushRoute('/settings')}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => uc.logOut()}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        default:
          throw new UnreachableCaseError(uc.authState);
      }
    }}
  </Subscribe>
);
