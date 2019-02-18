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
    <div className="pipelineLayout">{children}</div>
  </>
);

export default Layout;
