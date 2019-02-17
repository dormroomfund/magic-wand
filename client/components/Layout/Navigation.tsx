import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Container from 'react-bootstrap/lib/Container';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from '../../routes';
import UserActions from './UserActions';
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  background-color: white;
  box-shadow: 0px 0px 2px 2px #A5ACB1;
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
      <Container>
        <Link route="/pipeline">
          <a>
            <StyledNavbar.Brand>
              Magic Wand <Badge variant="primary">v0</Badge>
            </StyledNavbar.Brand>
          </a>
        </Link>
        <StyledNavbar.Toggle className="mr-2" />
        <StyledNavbar.Collapse>
          <StyledNav navbar>
            <Link route="/pipeline">
              <StyledNav.Link href="/pipeline">Pipeline</StyledNav.Link>
            </Link>
            <Link route="/archive">
              <StyledNav.Link href="/archive">Archive</StyledNav.Link>
            </Link>
          </StyledNav>
          <Nav navbar className="ml-auto">
            <UserActions />
          </Nav>
        </StyledNavbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};
