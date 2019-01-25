import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

export default () => (
  <NavDropdown title="<e-mail address>" id="user-actions-drop">
    <NavDropdown.Item>Log Out</NavDropdown.Item>
  </NavDropdown>
);
