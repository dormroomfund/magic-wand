import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Container from 'react-bootstrap/lib/Container';

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
