import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Navigation from './Navigation';
import styled from 'styled-components';


// const StyledContainer = styled(Container)`
//   margin-top: 0 !important;
// `;

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <Container className="mt-5 pt-4">{children}</Container>
  </>
);

export default Layout;
