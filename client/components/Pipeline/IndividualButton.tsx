import React, { PureComponent } from 'react';

import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';

interface DropdownProps {
  loggedInPartnerName: string;
}

export default class IndividualButton extends PureComponent<DropdownProps> {
  render() {
    return (
      <Subscribe to={[PipelineContainer]}>
        {(pipe: PipelineContainer) => (
          <Button
            onClick={() =>
              pipe.setCurrentPartner(this.props.loggedInPartnerName)
            }
          >
            Individual
          </Button>
        )}
      </Subscribe>
    );
  }
}
