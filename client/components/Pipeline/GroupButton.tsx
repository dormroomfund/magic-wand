import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';

const StyledButton = styled(Button)`
  background-color: #1c37c5;
  border: none;
  margin: 0.5% 1%;
`;

interface GroupButtonProps {
  reloadKanbanCompanies: (
    currentTeam: any,
    currentPartnerId: any
  ) => Promise<void>;
}

export default (props) => (
  <STAC>
    {(ac) => (
      <a
        role="button"
        tabIndex={0}
        onClick={() => {
          ac.pipeline.setCurrentPartner('ALL');
          props.reloadKanbanCompanies('default', 'ALL');
        }}
      >
        <img src="/static/Team_Button.png" />
      </a>
    )}
  </STAC>
);
