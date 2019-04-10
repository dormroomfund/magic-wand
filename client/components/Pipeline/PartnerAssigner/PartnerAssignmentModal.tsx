import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Paginated } from '@feathersjs/feathers';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styled from 'styled-components';
import Image from 'react-bootstrap/lib/Image';
import { Company, companySchema } from '../../../schemas/company';
import { PartnerAssignmentModalProps } from './PartnerAssignmentModal';
import { User } from '../../../schemas/user';
import client from '../../../lib/client';
import { CompanyPointPartner } from '../../../schemas/companyPointPartner';

const StyledListGroupItem = styled(ListGroup.Item)`
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 255, 0.25);
  }
`;

const ProfileImage = styled(Image)`
  margin-top: -0.125em;
  margin-right: 0.5em;
  height: 28px;
`;

export interface PartnerAssignmentModalProps {
  /** The company we're assigning for. */
  company: Company;

  /** Array of all partners to select from. */
  partners: User[];

  assignedPartnerIds: number[];

  show?: boolean;

  onHide?: () => void;
  onTogglePartner?: (userId: number, assign: boolean) => void;
}

export default class PartnerAssignmentModal extends Component<
  PartnerAssignmentModalProps
> {
  renderPartners() {
    const {
      partners,
      onTogglePartner = () => {},
      assignedPartnerIds,
    } = this.props;

    return (
      <ListGroup>
        {partners.map((partner) => (
          <StyledListGroupItem
            key={partner.id}
            active={assignedPartnerIds.includes(partner.id)}
            onClick={() => {
              onTogglePartner(
                partner.id,
                !assignedPartnerIds.includes(partner.id)
              );
            }}
          >
            {partner.photo && (
              <ProfileImage src={partner.photo} roundedCircle />
            )}
            {`${partner.firstName} ${partner.lastName}`}
          </StyledListGroupItem>
        ))}
      </ListGroup>
    );
  }

  render() {
    const { company, partners, show = false, onHide = () => {} } = this.props;

    return (
      <Modal show={show} size="lg" centered backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Partners for {company.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderPartners()}</Modal.Body>
        <Modal.Footer>
          <small>
            {partners.length} members for {company.team}
          </small>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
