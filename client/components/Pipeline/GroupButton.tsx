import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { Team } from '../../schemas/common';

const StyledButton = styled(Button)`
  background-color: #1c37c5;
  border: none;
  margin: 0.5% 1%;
`;

interface GroupButtonProps {
  reloadKanbanCompanies: (
    currentTeam: string,
    currentPartnerId: string
  ) => Promise<void>;
}

export default (props) => (
  <STAC>
    {(ac) => (
      <a
        role="button"
        tabIndex={0}
        onClick={() => {
          props.reloadKanbanCompanies(Team.All, 'ALL');
          ac.pipeline.setCurrentPartnerFirstName('ALL');
          ac.pipeline.setCurrentTeamView(Team.All);
        }}
      >
        <img src="/static/Team_Button.png" />
      </a>
    )}
  </STAC>
);
