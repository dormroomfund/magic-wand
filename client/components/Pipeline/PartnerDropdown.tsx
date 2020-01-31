import React, { PureComponent } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { User } from '../../schemas/user';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
`;

interface PartnerDropdownProps {
  partners: Set<User>;
  reloadKanbanCompanies: (
    currentTeam: string,
    currentPartnerId: string
  ) => Promise<void>;
}

export default class PartnerDropdown extends PureComponent<
  PartnerDropdownProps
> {
  renderItems = (partner, pipeline) => (
    <Dropdown.Item
      key={`${partner.firstName} ${partner.lastName}`}
      onSelect={() => {
        pipeline.setCurrentPartnerFirstName(partner.firstName);
        this.props.reloadKanbanCompanies('default', partner.id);
      }}
    >
      {`${partner.firstName} ${partner.lastName}`}
    </Dropdown.Item>
  );

  render() {
    return (
      <STAC>
        {(ac) => (
          <StyledDropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              {ac.pipeline.state.currentPartnerFirstName === 'ALL'
                ? 'Partner'
                : ac.pipeline.state.currentPartnerFirstName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...this.props.partners].map((partner) =>
                this.renderItems(partner, ac.pipeline)
              )}
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
