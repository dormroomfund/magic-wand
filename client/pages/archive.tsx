import { default as React } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Archive from '../components/Archive/Archive';
import Layout from '../components/Layout/Layout';

export default () => (
  <Layout>
    <Row>
      <Col md={{ offset: 2, width: 8 }}>
        <Archive />
      </Col>
    </Row>
  </Layout>
);
