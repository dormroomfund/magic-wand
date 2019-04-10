import React, { PureComponent } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { User } from '../../schemas/user';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
`;

interface DropdownProps {
  partners: Set<User>;
}

export default class CustomDropdown extends PureComponent<DropdownProps> {
  renderItems = (partner, pipeline) => (
    <StyledDropdown.Item
      key={partner}
      onSelect={() => pipeline.setCurrentPartner(partner)}
    >
      {partner}
    </StyledDropdown.Item>
  );

  render() {
    return (
      <STAC>
        {(ac) => (
          <StyledDropdown>
            <StyledDropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              size="sm"
            >
              Partner
            </StyledDropdown.Toggle>

            <StyledDropdown.Menu>
              {[...this.props.partners].map((partner) =>
                this.renderItems(partner, ac.pipeline)
              )}
            </StyledDropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
