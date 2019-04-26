import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import DropdownItem from 'react-bootstrap/lib/DropdownItem';
import { CompanyLink } from '../../schemas/company';
import { DocumentTypes } from '../../schemas/gdrive';

const StyledDropdown = styled(Dropdown)`
  border: none;

  button {
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
  }

  div {
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
  }
`;

interface AttachmentDropdownProps {
  links: CompanyLink[];
}

export default ({ links = [] }: AttachmentDropdownProps) => (
  <div>
    <StyledDropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
        Attachments
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {links.map(({ name, url }) =>
          Object.values(DocumentTypes).includes(name) ? (
            <DropdownItem key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {' '}
                {name}{' '}
              </a>
            </DropdownItem>
          ) : null
        )}
      </Dropdown.Menu>
    </StyledDropdown>
  </div>
);
