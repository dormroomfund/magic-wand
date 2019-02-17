import React from 'react';
import styled from 'styled-components'
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';


const StyledButton = styled(Button)`
  background-color: #1C37C5;
  border: none;
  margin: .5% 1%;
`;


interface DropdownProps {
  loggedInPartnerName: string;
}

const IndividualButton: React.FunctionComponent<DropdownProps> = (props) => {
  return (
    <Subscribe to={[PipelineContainer]}>
      {(pipe: PipelineContainer) => (
        <StyledButton
          onClick={() => pipe.setCurrentPartner(props.loggedInPartnerName)}
        >
          Individual
        </StyledButton>
      )}
    </Subscribe>
  );
};

export default IndividualButton;
