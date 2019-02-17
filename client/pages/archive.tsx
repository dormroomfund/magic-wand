import { default as React } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Archive from '../components/Archive/Archive';
import PipelineLayout from '../components/Layout/PipelineLayout';
import { getUser } from '../lib/authentication';
import { redirect } from '../lib/routing';

const ArchivePage = () => (
  <PipelineLayout>
    <Row>
      <Col>
        <Archive />
      </Col>
    </Row>
  </PipelineLayout>
);

ArchivePage.getInitialProps = async ({ req, res }) => {
  const user = await getUser(req);
  if (!user) {
    redirect('/', res);
    return;
  }
};

export default ArchivePage;
