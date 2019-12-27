import React, { PureComponent } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { Team } from '../schemas/common';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
`;

interface PartnerTeamDropdownProps {
  partnerTeams: Set<Team>;
}

export default class PartnerTeamDropdown extends PureComponent<
  PartnerTeamDropdownProps
> {
  renderItems = (partnerTeam, pipeline) => (
    <Dropdown.Item
      key={partnerTeam}
      onSelect={() => pipeline.setCurrentTeamView(partnerTeam)}
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
              Team
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...this.props.partnerTeams].map((partnerTeam) =>
                this.renderItems(partnerTeam, ac.pipeline)
              )}
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
