import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Navigation from './Navigation';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <Container className="mt-5">{children}</Container>
  </>
);

export default Layout;
