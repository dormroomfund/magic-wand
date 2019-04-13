import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import styled from 'styled-components';
import { take } from 'lodash';
import { User } from '../../../schemas/user';

const ProfileImage = styled(Image)`
  margin-top: -0.125em;
  margin-right: 0.5em;
  height: 28px;
`;

export interface PartnerAssignerDisplay {
  partners?: User[];
  show?: number;
}

// TODO: Show all profiles and stack them like chips.
export default ({ partners = [], show = 3 }: PartnerAssignerDisplay) => (
  <span data-component="PartnerAssignerDisplay">
    {take(partners, show).map((partner) => (
      <ProfileImage
        key={partner.id}
        src={partner.photo}
        alt={`${partner.firstName} ${partner.lastName}'s profile photo}`}
        roundedCircle
      />
    ))}
  </span>
);
