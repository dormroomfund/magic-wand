import React from 'react';
import styled from 'styled-components';
import { CompanyLink } from '../../../schemas/company';
import { DocumentTypes } from '../../../schemas/gdrive';

export interface LinksViewerDisplayProps {
  links?: CompanyLink[];
  show?: number;
}

const Link = styled.a`
  margin: 0% 1%;
  font-size: 0.9rem;
`;

export default ({ links = [] }: LinksViewerDisplayProps) => (
  <span data-cy="LinksViewerDisplay">
    {links.map(({ name, url }) =>
      // Do not want to include links such as the prevote doc here
      !Object.values(DocumentTypes).includes(name) ? (
        <Link key={name} href={url} target="_blank" rel="noopener noreferrer">
          {' '}
          {name}{' '}
        </Link>
      ) : null
    )}
  </span>
);
