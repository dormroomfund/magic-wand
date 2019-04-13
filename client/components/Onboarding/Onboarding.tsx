import { JSONSchema6 } from 'json-schema';
import React from 'react';
import Form from 'react-jsonschema-form-bs4';
import { Subscribe } from 'unstated';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
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
    <Subscribe to={[CurrentUserContainer]}>
      {(cuc: CurrentUserContainer) => (
        <Form
          schema={onboardingSchema}
          formData={cuc.user}
          onSubmit={({ formData }) => cuc.updateUser(formData)}
        />
      )}
    </Subscribe>
  </div>
);
