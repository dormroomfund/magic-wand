import React, { PureComponent } from 'react';

import Dropdown from 'react-bootstrap/lib/Dropdown';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';
import { User } from '../../schemas/user';

interface DropdownProps {
  partners: Set<User>;
}

export default class CustomDropdown extends PureComponent<DropdownProps> {
  renderItems = (partner, pipe) => (
    <Dropdown.Item
      key={partner}
      onSelect={() => pipe.setCurrentPartner(partner)}
    >
      {partner}
    </Dropdown.Item>
  );

  render() {
    return (
      <Subscribe to={[PipelineContainer]}>
        {(pipe: PipelineContainer) => (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...this.props.partners].map((partner) =>
                this.renderItems(partner, pipe)
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Subscribe>
    );
  }
}
