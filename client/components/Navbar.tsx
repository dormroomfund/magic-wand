import React from 'react';
import { Layout, Menu as AntMenu } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const { Header: AntHeader, Content: AntContent } = Layout;

// Navbar component takes in content and renders a navbar on top of it

const Header = styled(AntHeader)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: center;
  margin-bottom: 25px;
`;

const Menu = styled(AntMenu)`
  margin: 25px;
  line-height: 30px;
  border-bottom: none;
  font-size: 16px;
  font-weight: 500;
`;

const Logo = styled.img`
  margin-left: 15px;
  justify-self: start;
  max-width: 250px;
`;

const Link = styled(RouterLink)`
  /* &&& injects three classes -> one for each &
  this prevents use of !important but allows overwriting Ant design classes
  */

  .ant-menu-item {
    border-bottom: none;
  }

  &&& {
    color: black;
  }
`;

const Navbar = ({ children }) => (
  <React.Fragment>
    <Header style={{ background: 'white' }}>
      <RouterLink style={{ justifySelf: 'start' }} to="/">
        <Logo src={'../assets/LongLogo_Black.png'} />
      </RouterLink>
      <Menu mode="horizontal" style={{}}>
        <Menu.Item key="1">
          <Link to="/pipeline"> Pipeline </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/portfolio"> Portfolio Success </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/research"> Research </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <AntContent>{children}</AntContent>
  </React.Fragment>
);

export default Navbar;
