import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavLink from 'react-bootstrap/lib/NavLink';
import styled from 'styled-components';
import Image from 'react-bootstrap/lib/Image';
import { Subscribe } from 'unstated';
import UserContainer, { AuthState } from '../../containers/UserContainer';
import { UnreachableCaseError } from '../../lib/errors';
import { Router } from '../../routes';

const ProfileImage = styled(Image)`
  max-height: 32px;
`;

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
            <Dropdown as={NavItem} alignRight>
              <Dropdown.Toggle as={NavLink} id="navbar-auth-dropdown">
                {uc.user &&
                  (uc.user.photo ? (
                    <ProfileImage src={uc.user.photo} roundedCircle />
                  ) : (
                    uc.user.email
                  ))}
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
