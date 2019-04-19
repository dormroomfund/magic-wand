import React from 'react';
import { CompanyLink } from '../../../schemas/company';

export interface LinksViewerDisplayProps {
  links?: CompanyLink[];
  show?: number;
}

export default ({ links = [] }: LinksViewerDisplayProps) => (
  <span data-component="LinksViewerDisplay">
    {links.map(({ name, url }) => (
      <a key={name} href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    ))}
  </span>
);
