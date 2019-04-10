import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { sortBy } from 'lodash';
import { Company } from '../../../schemas/company';
import PartnerAssignmentModal from './PartnerAssignmentModal';
import {
  withAC,
  ApplicationContainerProps,
} from '../../../containers/ApplicationContainer';

export interface PartnerAssignerProps {
  companyId: number;
}

interface PartnerAssignerState {
  show: boolean;
}

class PartnerAssigner extends Component<
  PartnerAssignerProps & ApplicationContainerProps,
  PartnerAssignerState
> {
  state = { show: false };

  handleShowModal = async () => {
    const { applicationContainer: ac, companyId } = this.props;
    const company = await ac.companies.retrieve(companyId);
    await ac.users.retrieveByPartnerTeam(company.team);

    this.setState({ show: true });
  };

  handleHideModal = () => {
    this.setState({ show: false });
  };

  handleTogglePartner = (userId: number, assign: boolean) => {
    const { applicationContainer: ac, companyId } = this.props;

    if (assign) {
      ac.companies.assignPartner(companyId, userId);
    } else {
      ac.companies.unassignPartner(companyId, userId);
    }
  };

  render() {
    const { applicationContainer: ac, companyId } = this.props;
    const { show } = this.state;
    const company = ac.companies.get(companyId);

    const partners = sortBy(
      ac.users.getByPartnerTeam(company && company.team),
      ['firstName']
    );
    const assignedPartnerIds =
      company && company.pointPartners
        ? company.pointPartners.map((co) => co.id)
        : [];

    return (
      <>
        <Button variant="primary" onClick={this.handleShowModal}>
          Assign
        </Button>

        {company && (
          <PartnerAssignmentModal
            company={company}
            partners={partners}
            assignedPartnerIds={assignedPartnerIds}
            show={show}
            onTogglePartner={this.handleTogglePartner}
            onHide={this.handleHideModal}
          />
        )}
      </>
    );
  }
}

export default withAC(PartnerAssigner);
