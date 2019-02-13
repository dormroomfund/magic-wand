import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import PipelineContainer from '../../containers/PipelineContainer';

export default () => (
  <Subscribe to={[PipelineContainer]}>
    {(pipe: PipelineContainer) => (
      <Button onClick={() => pipe.setCurrentPartner('ALL')}>Group</Button>
    )}
  </Subscribe>
);
