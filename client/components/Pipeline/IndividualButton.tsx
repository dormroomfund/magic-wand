import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';

const StyledButton = styled(Button)`
  background-color: #1c37c5;
  border: none;
  margin: 0.5% 1%;
`;

interface DropdownProps {
  loggedInPartnerId: string;
  loggedInPartnerFirstName: string;
  reloadKanbanCompanies: (
    currentTeam: string,
    currentPartnerId: string
  ) => Promise<void>;
}

const IndividualButton: React.FunctionComponent<DropdownProps> = (props) => (
  <STAC>
    {(ac) => (
      <a
        onClick={() => {
          ac.pipeline.setCurrentPartnerFirstName(
            props.loggedInPartnerFirstName
          );
          props.reloadKanbanCompanies('default', props.loggedInPartnerId);
        }}
        role="button"
        tabIndex={0}
      >
        <img src="/static/Individual_Button.png" />
      </a>
    )}
  </STAC>
);

export default IndividualButton;
