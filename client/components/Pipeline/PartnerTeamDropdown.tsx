import React, { PureComponent } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { Team } from '../../schemas/common';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
`;

interface PartnerTeamDropdownProps {
  reloadKanbanCompanies: (
    currentTeam: string,
    currentPartnerId: string
  ) => Promise<void>;
}

export default class PartnerTeamDropdown extends PureComponent<
  PartnerTeamDropdownProps
> {
  renderItems = (partnerTeam, pipeline) => (
    <Dropdown.Item
      key={partnerTeam}
      onSelect={() => {
        pipeline.setCurrentTeamView(partnerTeam);
        this.props.reloadKanbanCompanies(partnerTeam, 'ALL');
      }}
    >
      {partnerTeam}
    </Dropdown.Item>
  );

  render() {
    return (
      <STAC>
        {(ac) => (
          <StyledDropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              {ac.pipeline.state.currentTeam === 'default'
                ? 'Team'
                : ac.pipeline.state.currentTeam}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...Object.values(Team)].map((partnerTeam) =>
                this.renderItems(partnerTeam, ac.pipeline)
              )}
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
