import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Navigation from './Navigation';
import styled from 'styled-components';

export interface LayoutProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)`
  margin: 0 !important;
  width: 100vw !important;
  max-width: none !important;
`;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <StyledContainer>{children}</StyledContainer>
  </>
);

export default Layout;
