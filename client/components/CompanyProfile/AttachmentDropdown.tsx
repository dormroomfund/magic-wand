import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import DropdownItem from 'react-bootstrap/lib/DropdownItem';
import { CompanyLink } from '../../schemas/company';
import { DocumentTypes } from '../../schemas/gdrive';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
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
