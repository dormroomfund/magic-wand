import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';
import { User } from '../../schemas/user';


const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: .5% 1%;
`;

interface DropdownProps {
  partners: Set<User>;
}

export default class CustomDropdown extends PureComponent<DropdownProps> {
  renderItems = (partner, pipe) => (
    <StyledDropdown.Item
      key={partner}
      onSelect={() => pipe.setCurrentPartner(partner)}
    >
      {partner}
    </StyledDropdown.Item>
  );

  render() {
    return (
      <Subscribe to={[PipelineContainer]}>
        {(pipe: PipelineContainer) => (
          <StyledDropdown>
            <StyledDropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              Partner
            </StyledDropdown.Toggle>

            <StyledDropdown.Menu>
              {[...this.props.partners].map((partner) =>
                this.renderItems(partner, pipe)
              )}
            </StyledDropdown.Menu>
          </StyledDropdown>
        )}
      </Subscribe>
    );
  }
}

