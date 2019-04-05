import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Company } from '../../../schemas/company';
import PartnerAssignmentModal from './PartnerAssignmentModal';

export interface PartnerAssignerProps {
  company: Company;
}

interface PartnerAssignerState {
  show: boolean;
}

export default class PartnerAssigner extends Component<
  PartnerAssignerProps,
  PartnerAssignerState
> {
  state = { show: false };

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => this.setState({ show: true })}>
          Assign
        </Button>

        <PartnerAssignmentModal
          company={this.props.company}
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        />
      </>
    );
  }
}
