import React, { Component } from 'react';
import Image from 'react-bootstrap/lib/Image';
import styled from 'styled-components';
import add from '../../../assets/add.svg';
import {
  ApplicationContainerProps,
  withAC,
} from '../../../containers/ApplicationContainer';
import LinksViewerDisplay from './LinksViewerDisplay';
import LinksViewerModal from './LinksViewerModal';
import { CompanyLink } from '../../../schemas/company';

export interface LinksViewerProps {
  companyId: number;
}

interface LinksViewerState {
  show: boolean;
}

const AddImage = styled(Image)`
  cursor: pointer;

  &:hover {
    box-shadow: 0.5px 0.5px 3px #9e9e9e;
  }
`;

class LinksViewer extends Component<
  LinksViewerProps & ApplicationContainerProps,
  LinksViewerState
> {
  state = { show: false };

  handleShowModal = async () => {
    this.setState({ show: true });
  };

  handleHideModal = () => {
    this.setState({ show: false });
  };

  /* Modify this to add links */
  handleAddLink = ({ formData }) => {
    const { applicationContainer: ac, companyId } = this.props;
    ac.companies.addCompanyLink(companyId, formData);
    this.setState({ show: false });
  };

  render() {
    const { applicationContainer: ac, companyId } = this.props;
    const { show } = this.state;
    const company = ac.companies.get(companyId);

    return (
      <div data-cy="LinksViewer">
        <a
          data-cy="LinksViewer-Activate"
          onClick={this.handleShowModal}
          role="button"
          tabIndex={0}
        >
          <LinksViewerDisplay
            links={company && company.companyLinks}
            show={4}
          />
          <AddImage src={add} roundedCircle />
        </a>

        {company && (
          <LinksViewerModal
            company={company}
            show={show}
            onHide={this.handleHideModal}
            addLink={this.handleAddLink}
          />
        )}
      </div>
    );
  }
}

export default withAC(LinksViewer);
