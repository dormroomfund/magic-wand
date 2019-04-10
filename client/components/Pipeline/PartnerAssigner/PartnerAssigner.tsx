import { sortBy } from 'lodash';
import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import {
  ApplicationContainerProps,
  withAC,
} from '../../../containers/ApplicationContainer';
import PartnerAssignerDisplay from './PartnerAssignerDisplay';
import PartnerAssignmentModal from './PartnerAssignmentModal';

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

  async componentDidMount() {
    await this.retrieveData();
  }

  handleShowModal = async () => {
    await this.retrieveData();
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

  retrieveData = async () => {
    const { applicationContainer: ac, companyId } = this.props;
    const company = await ac.companies.retrieve(companyId);
    await ac.users.retrieveByPartnerTeam(company.team);
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
      <div data-cy="PartnerAssigner">
        <Button
          variant="primary"
          size="sm"
          className="mr-2"
          onClick={this.handleShowModal}
        >
          Assign
        </Button>
        <PartnerAssignerDisplay
          partners={company && company.pointPartners}
          show={4}
        />

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
      </div>
    );
  }
}

export default withAC(PartnerAssigner);
