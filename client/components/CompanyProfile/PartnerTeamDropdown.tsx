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
  partnerTeams: string[];
  companyId: number;
  currentPartnerTeam: string;
}

export default class PartnerTeamDropdown extends PureComponent<
  PartnerTeamDropdownProps
> {
  renderItems = (partnerTeam, companies) => (
    <Dropdown.Item
      key={partnerTeam}
      onSelect={() => {
        if (
          window.confirm(
            'Are you sure you want to assign this company to a different team?'
          )
        ) {
          companies.patch(this.props.companyId, { team: partnerTeam });
        }
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
              {this.props.currentPartnerTeam}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...this.props.partnerTeams].map((partnerTeam) =>
                this.renderItems(partnerTeam, ac.companies)
              )}
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
