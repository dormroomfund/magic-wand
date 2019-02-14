import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';

interface DropdownProps {
  loggedInPartnerName: string;
}

const IndividualButton: React.FunctionComponent<DropdownProps> = (props) => {
  return (
    <Subscribe to={[PipelineContainer]}>
      {(pipe: PipelineContainer) => (
        <Button
          onClick={() => pipe.setCurrentPartner(props.loggedInPartnerName)}
        >
          Individual
        </Button>
      )}
    </Subscribe>
  );
};

export default IndividualButton;
