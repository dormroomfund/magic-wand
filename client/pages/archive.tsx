import { default as React } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Archive from '../components/Archive/Archive';
import Layout from '../components/Layout/Layout';
import { getUser } from '../lib/authentication';
import { redirect } from '../lib/routing';

const ArchivePage = () => (
  <Layout>
    <Row>
      <Col md={{ offset: 2, width: 8 }}>
        <Archive />
      </Col>
    </Row>
  </Layout>
);

ArchivePage.getInitialProps = async ({ req, res }) => {
  const user = await getUser(req);
  if (!user) {
    redirect('/', res);
    return;
  }
};

export default ArchivePage;
