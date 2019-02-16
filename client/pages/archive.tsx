import { default as React } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ArchiveList from '../components/Archive/ArchiveList';
import Layout from '../components/Layout/Layout';

export default () => (
  <Layout>
    <Row>
      <Col md={{ offset: 2, width: 8 }}>
        <ArchiveList />
      </Col>
    </Row>
  </Layout>
);
