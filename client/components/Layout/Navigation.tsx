import Link from 'next/link';
import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import UserActions from './UserActions';
import Container from 'react-bootstrap/lib/Container';

export default () => {
  return (
    <Navbar variant="dark" bg="dark" fixed="top">
      <Container>
        <Link href="/">
          <a>
            <Navbar.Brand>
              Magic Wand <Badge variant="primary">v0</Badge>
            </Navbar.Brand>
          </a>
        </Link>
        <Link href="/pipeline">
          <a>
            Pipeline
          </a>
        </Link>
        <Navbar.Toggle className="mr-2" />
        <Navbar.Collapse>
          <Nav navbar className="ml-auto">
            <UserActions />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
