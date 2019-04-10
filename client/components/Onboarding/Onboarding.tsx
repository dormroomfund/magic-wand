import { JSONSchema6 } from 'json-schema';
import React from 'react';
import Form from 'react-jsonschema-form-bs4';
import { Subscribe } from 'unstated';
import UserContainer from '../../containers/UserContainer';
import client from '../../lib/client';
import { userSchema } from '../../schemas/user';
import { makeRequired, pick } from '../../schemas/_utils';

const onboardingSchema = makeRequired(
  pick(userSchema as JSONSchema6, ['partnerTeam', 'partnerPosition']),
  ['partnerTeam', 'partnerPosition']
);

export default () => (
  <div>
    <h1>Before we begin...</h1>
    <p>Help us sort you into the right place for Magic Wand.</p>
    <Subscribe to={[UserContainer]}>
      {(uc: UserContainer) => (
        <Form
          schema={onboardingSchema}
          formData={uc.user}
          onSubmit={({ formData }) => uc.updateUser(formData)}
        />
      )}
    </Subscribe>
  </div>
);
