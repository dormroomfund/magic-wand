import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/lib/Container';
import styled from 'styled-components';
import Navigation from './Navigation';

export interface LayoutProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)`
  max-width: none !important;
  padding: 0;
  margin: 0;
`;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    <StyledContainer className="mt-5 ml-0 mr-0 pt-4 w-100">
      {children}
    </StyledContainer>
  </>
);

export default Layout;
