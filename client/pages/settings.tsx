import { identity, pickBy } from 'lodash';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-jsonschema-form';
import { Subscribe } from 'unstated';
import Layout from '../components/Layout/Layout';
import UserContainer from '../containers/UserContainer';
import { getUser } from '../lib/authentication';
import client from '../lib/client';
import { redirect, requireLoggedIn } from '../lib/routing';
import { userSchema } from '../schemas/user';

const log = (type) => console.log.bind(console, type);

const uiSchema = {
  id: {
    'ui:disabled': 'true',
  },
  auth0: {
    'ui:disabled': 'true',
  },
  auth0Id: {
    'ui:disabled': 'true',
  },
  email: {
    // 'ui:disabled': 'true',
  },
  permissions: {
    'ui:disabled': 'true',
  },
  firstName: {},
  lastName: {},
  school: {},
  photo: {},
  linkedin: {},
  gender: {},
  ethnicity: {},
  partnerTeam: {},
  partnerPosition: {},
};

const SettingsPage = () => {
  const submitForm = async ({ formData }) => {
    await client.service('api/users').patch(formData.id, formData);
    alert('Updated');
  };

  return (
    <Layout>
      <Row>
        <Col>
          <h1>Settings</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Subscribe to={[UserContainer]}>
            {(uc: UserContainer) => (
              <Form
                schema={userSchema}
                uiSchema={uiSchema}
                formData={pickBy(uc.user, identity)}
                onChange={log('changed')}
                onSubmit={submitForm}
                onError={log('errors')}
              />
            )}
          </Subscribe>
        </Col>
      </Row>
    </Layout>
  );
};

SettingsPage.getInitialProps = requireLoggedIn();

export default SettingsPage;
