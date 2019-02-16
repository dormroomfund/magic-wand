import { JSONSchema6 } from 'json-schema';
import React from 'react';
import Form from 'react-jsonschema-form-bs4';
import { Subscribe } from 'unstated';
import UserContainer from '../../containers/UserContainer';
import client from '../../lib/client';
import { userSchema } from '../../shared/schema';
import { makeRequired, pick } from '../../shared/schemaUtils';

const onboardingSchema = makeRequired(
  pick(userSchema as JSONSchema6, [
    'first_name',
    'last_name',
    'school',
    'linkedin',
    'gender',
    'ethnicity',
    'partner_team',
    'partner_position',
  ]),
  ['school', 'partner_team', 'partner_position']
);

export default () => {
  const handleSubmit = (uc: UserContainer) => async ({ formData }) => {
    try {
      const res = await client.service('api/users').patch(uc.user.id, formData);
      uc.retrieveUser();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Before we begin...</h1>
      <p>Help us sort you into the right place for Magic Wand.</p>
      <Subscribe to={[UserContainer]}>
        {(uc: UserContainer) => (
          <Form
            schema={onboardingSchema}
            formData={uc.user}
            onSubmit={handleSubmit(uc)}
          />
        )}
      </Subscribe>
    </div>
  );
};
