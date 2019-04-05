import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';

const StyledButton = styled(Button)`
  background-color: #1c37c5;
  border: none;
  margin: 0.5% 1%;
`;

interface DropdownProps {
  loggedInPartnerName: string;
}

const IndividualButton: React.FunctionComponent<DropdownProps> = (props) => (
  <Subscribe to={[PipelineContainer]}>
    {(pipe: PipelineContainer) => (
      <a
        onClick={() => pipe.setCurrentPartner(props.loggedInPartnerName)}
        role="button"
        tabIndex={0}
      >
        <img src="/static/Individual_Button.png" />
      </a>
    )}
  </Subscribe>
);

export default IndividualButton;
