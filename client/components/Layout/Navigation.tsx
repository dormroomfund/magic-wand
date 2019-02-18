import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Container from 'react-bootstrap/lib/Container';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from '../../routes';
import UserActions from './UserActions';
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin: 0 5vw;
  width: 100%;
  max-width: none;
`;


const StyledNavbar = styled(Navbar)`
  background-color: white;
  box-shadow: 0px 0px 2px 2px #A5ACB1;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  max-width: none;
`;

const StyledNav = styled(Nav)`
  color: #050B1A;
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-end !important;
  width: 100%;
`;

export default () => {
  return (
    <StyledNavbar fixed="top">
      <StyledContainer>
        <Link route="/pipeline">
          <a>
            <StyledNavbar.Brand>
              Magic Wand <Badge variant="primary">v0</Badge>
            </StyledNavbar.Brand>
          </a>
        </Link>
        <StyledNavbar.Toggle className="mr-2" />
        <StyledNavbar.Collapse>
          <StyledNav navbar className="topNav">
            <Link route="/pipeline">
              <StyledNav.Link href="/pipeline">Pipeline</StyledNav.Link>
            </Link>
            <Link route="/archive">
              <StyledNav.Link href="/archive">Portfolio Success</StyledNav.Link>
            </Link>
          </StyledNav>
          <Nav navbar className="ml-auto">
            <UserActions />
          </Nav>
        </StyledNavbar.Collapse>
      </StyledContainer>
    </StyledNavbar>
  );
};
