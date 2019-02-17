import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Container from 'react-bootstrap/lib/Container';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from '../../routes';
import UserActions from './UserActions';

export default () => {
  return (
    <Navbar variant="dark" bg="dark" fixed="top">
      <Container>
        <Link route="/pipeline">
          <a>
            <Navbar.Brand>
              Magic Wand <Badge variant="primary">v0</Badge>
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle className="mr-2" />
        <Navbar.Collapse>
          <Nav navbar>
            <Link route="/pipeline">
              <Nav.Link href="/pipeline">Pipeline</Nav.Link>
            </Link>
            <Link route="/archive">
              <Nav.Link href="/archive">Archive</Nav.Link>
            </Link>
          </Nav>
          <Nav navbar className="ml-auto">
            <UserActions />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
