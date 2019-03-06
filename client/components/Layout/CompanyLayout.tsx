import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Navigation from './Navigation';
import styled from 'styled-components';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <Container className="companylayout">{children}</Container>
  </>
);

export default Layout;