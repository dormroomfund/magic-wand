import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Research from '../components/Research/Research';
import PipelineLayout from '../components/Layout/PipelineLayout';
import { requireLoggedIn } from '../lib/routing';

const ResearchPage = () => (
  <PipelineLayout>
    <Row>
      <Research />
    </Row>
  </PipelineLayout>
);

ResearchPage.getInitialProps = requireLoggedIn();

export default ResearchPage;
