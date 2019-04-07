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
  partners: User[];

  /** The IDs of the partners assigned. */
  assignedPartners: number[];
}

export default class PartnerAssignmentModal extends Component<
  PartnerAssignmentModalProps,
  PartnerAssignmentModalState
> {
  constructor(props) {
    super(props);

    const { company } = this.props;
    this.state = {
      partners: [],
      assignedPartners: company.pointPartners || [],
    };
  }

  async componentDidMount() {
    const { company } = this.props;
    const partners = ((await client
      .service('api/users')
      .find({ query: { partnerTeam: company.team } })) as Paginated<User>).data;
    this.setState({ partners });
  }

  handlePartnerClick = (id: number, assigned: boolean) => () => {
    const { company } = this.props;
    const reducer = assigned
      ? (state) => ({
          ...state,
          assignedPartners: state.assignedPartners.filter(
            (partnerId) => partnerId !== id
          ),
        })
      : (state) => ({
          ...state,
          assignedPartners: state.assignedPartners.concat([id]),
        });

    this.setState(reducer, async () => {
      await client.service('api/companies').patch(company.id, {
        // TODO
        // pointPartners: this.state.assignedPartners,
      });
    });
  };

  renderPartners() {
    const { partners, assignedPartners } = this.state;

    return (
      <ListGroup>
        {partners.map((partner) => (
          <StyledListGroupItem
            key={partner.id}
            active={assignedPartners.includes(partner.id)}
            onClick={this.handlePartnerClick(
              partner.id,
              assignedPartners.includes(partner.id)
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
      <Modal show={show} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Partners for
            {company.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderPartners()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
