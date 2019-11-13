import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import DropdownItem from 'react-bootstrap/lib/DropdownItem';
import { CompanyLink } from '../../schemas/company';
import { DocumentTypes } from '../../schemas/gdrive';

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  border: 2px solid #dadde0;
  width: auto;
  background-color: white;
  color: #1c37c5;
  padding: 0.4% 0.9% 0.5% 0.9%;
  cursor: pointer;

  &:hover {
    background-color: #1c37c5;
    color: white;
    border: 2px solid #1c37c5;
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  width: auto;
  padding: 0;
  margin: 0;

  a {
    background-color: white;
    color: #1c37c5;
    padding: 4% 5% 3% 5%;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background-color: #1c37c5;
      color: white;

      a {
        background-color: #1c37c5;
        color: white;
      }
    }
  }
`;

interface AttachmentDropdownProps {
  links: CompanyLink[];
}

export default ({ links = [] }: AttachmentDropdownProps) => (
  <div>
    <Dropdown className="border-0">
      <StyledDropdownToggle variant="secondary" id="dropdown-basic" size="sm">
        Attachments
      </StyledDropdownToggle>

      <StyledDropdownMenu>
        {links.map(({ name, url }) =>
          Object.values(DocumentTypes).includes(name) ? (
            <DropdownItem key={name} href={url} target="_blank">
              {name}
            </DropdownItem>
          ) : null
        )}
      </StyledDropdownMenu>
    </Dropdown>
  </div>
);
