import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Paginated } from '@feathersjs/feathers';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import styled from 'styled-components';
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

export interface PartnerAssignmentModalProps {
  company: Company;
  show?: boolean;
  onHide?: () => void;
}

interface PartnerAssignmentModalState {
  /** all partners available to assign */
  partners: User[];

  /** the ids of partners assigned to the company */
  assignedPartnerIds: number[];
}

export default class PartnerAssignmentModal extends Component<
  PartnerAssignmentModalProps,
  PartnerAssignmentModalState
> {
  state = {
    partners: [],
    assignedPartnerIds: [],
  };

  async componentDidMount() {
    const { company } = this.props;
    const partners = ((await client
      .service('api/users')
      .find({ query: { partnerTeam: company.team } })) as Paginated<User>).data;
    this.setState({ partners });

    await this.retrievePointPartners();
  }

  /**
   * @param id the userId of the partner
   * @param assign if true, assigns the partner; if false, removes
   */
  handlePartnerClick = (id: number, assign: boolean) => async () => {
    const { company } = this.props;

    if (assign) {
      await client.service('api/companies/point-partners').create({
        companyId: company.id,
        userId: id,
      });
    } else {
      await client.service('api/companies/point-partners').remove(null, {
        query: {
          companyId: company.id,
          userId: id,
        },
      });
    }

    this.retrievePointPartners();
  };

  async retrievePointPartners() {
    const { company } = this.props;

    const relations = (await client
      .service('api/companies/point-partners')
      .find({
        query: {
          companyId: company.id,
        },
      })) as CompanyPointPartner[];

    this.setState({
      assignedPartnerIds: relations.map((rel) => rel.userId),
    });
  }

  renderPartners() {
    const { partners, assignedPartnerIds } = this.state;

    return (
      <ListGroup>
        {partners.map((partner) => (
          <StyledListGroupItem
            key={partner.id}
            active={assignedPartnerIds.includes(partner.id)}
            onClick={this.handlePartnerClick(
              partner.id,
              !assignedPartnerIds.includes(partner.id)
            )}
          >
            {`${partner.firstName} ${partner.lastName}`}
          </StyledListGroupItem>
        ))}
      </ListGroup>
    );
  }

  render() {
    const { company, show = false, onHide = () => {} } = this.props;

    return (
      <Modal show={show} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Partners for {company.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderPartners()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
