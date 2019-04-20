import React from 'react';
import { CompanyLink } from '../../../schemas/company';
import { DocumentTypes } from '../../../schemas/gdrive';

export interface LinksViewerDisplayProps {
  links?: CompanyLink[];
  show?: number;
}

export default ({ links = [] }: LinksViewerDisplayProps) => (
  <span data-component="LinksViewerDisplay">
    {links.map(({ name, url }) =>
      // Do not want to include links such as the prevote doc here
      !Object.values(DocumentTypes).includes(name) ? (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          {' '}
          {name}{' '}
        </a>
      ) : null
    )}
  </span>
);
