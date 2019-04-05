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

export default () => (
  <Subscribe to={[PipelineContainer]}>
    {(pipe: PipelineContainer) => (
      <a
        role="button"
        tabIndex={0}
        onClick={() => pipe.setCurrentPartner('ALL')}
      >
        <img src="/static/Team_Button.png" />
      </a>
    )}
  </Subscribe>
);
