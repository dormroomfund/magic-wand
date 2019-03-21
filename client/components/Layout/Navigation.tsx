import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Container from 'react-bootstrap/lib/Container';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link, Router } from '../../routes';
import UserActions from './UserActions';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin: 0 5vw;
  width: 100%;
  max-width: none;
`;

const StyledNavbar = styled(Navbar)`
  background-color: white;
  box-shadow: 0px 0px 2px 2px #a5acb1;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  max-width: none;
`;

const StyledNav = styled(Nav)`
  color: #050b1a;
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-end !important;
  width: 100%;

  & > a {
    border-bottom: 2px solid white;
    border-top: 2px solid white;
    padding: 0 !important;
    margin: 0.5rem 1rem 0.5rem 0.5rem;
    transition: border 150ms ease;

    &:hover {
      border-bottom: 3px solid blue;
    }
  }
`;

export default () => {
  return (
    <StyledNavbar fixed="top">
      <StyledContainer>
        <Link route="/pipeline">
          <a>
            <StyledNavbar.Brand>
              MagicWand <Badge variant="primary">v0</Badge>
            </StyledNavbar.Brand>
          </a>
        </Link>
        <StyledNavbar.Toggle className="mr-2" />
        <StyledNavbar.Collapse>
          <StyledNav navbar className="ml-auto">
            <StyledNav.Link onClick={() => Router.pushRoute('/pipeline')}>
              Pipeline
            </StyledNav.Link>
            <StyledNav.Link onClick={() => Router.pushRoute('/archive')}>
              Portfolio Success
            </StyledNav.Link>
            <UserActions />
          </StyledNav>
        </StyledNavbar.Collapse>
      </StyledContainer>
    </StyledNavbar>
  );
};
