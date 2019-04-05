import React from 'react';
import Form, { ISubmitEvent, IChangeEvent } from 'react-jsonschema-form-bs4';
import Button from 'react-bootstrap/lib/Button';
import { voteFormSchema, VoteFields } from '../../lib/voting';
import { Vote } from '../../schemas/vote';

export interface VotingFormProps {
  formData: VoteFields;
  onChange?: (e: IChangeEvent<VoteFields>) => any;
  onSubmit?: (e: ISubmitEvent<VoteFields>) => any;
  disabled?: boolean;
}

export default ({ formData, onChange, onSubmit, disabled = false }) => (
  <Form
    schema={voteFormSchema}
    onChange={onChange}
    disabled={disabled}
    formData={formData}
    onSubmit={onSubmit}
  >
    <Button disabled={disabled} type="submit">
      Submit
    </Button>
  </Form>
);
