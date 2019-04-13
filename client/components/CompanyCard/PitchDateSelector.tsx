import { JSONSchema6 } from 'json-schema';
import { omit } from 'lodash';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Form from 'react-jsonschema-form-bs4';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { companySchema } from '../../schemas/company';
import { pick } from '../../schemas/_utils';

const pitchSchema = omit(
  pick(companySchema as JSONSchema6, ['pitchDate']),
  'description'
);
const uiSchema = {
  pitchDate: {
    'ui:options': {
      label: false,
    },
  },
};

const FormWrapper = styled.div`
  .form-group {
    margin-top: 0.125em;
    margin-bottom: 0.375em;
  }
`;

export interface PitchDateSelectorProps {
  companyId: number;
}

const PitchDateSelector = ({ companyId }: PitchDateSelectorProps) => {
  const target = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <STAC>
      {(ac) => (
        <>
          <Overlay target={target.current} show={show} placement="bottom">
            {({ show: _show, ...props }) => (
              <Popover
                id="popover-pitch-date"
                title="Select Pitch Date"
                {...props}
              >
                <FormWrapper>
                  <Form
                    schema={pitchSchema}
                    uiSchema={uiSchema}
                    formData={ac.companies.get(companyId)}
                    onSubmit={async ({ formData }) => {
                      await ac.companies.patch(companyId, formData);
                      setShow(false);
                    }}
                  >
                    <Button type="submit">Submit</Button>
                  </Form>
                </FormWrapper>
              </Popover>
            )}
          </Overlay>
          <Button
            variant="secondary"
            ref={target}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <span
                role="img"
                title="Cancel Setting Pitch Date"
                aria-label="cancel set pitch date button"
              >
                ❌
              </span>
            ) : (
              <span
                role="img"
                title="Set Pitch Date"
                aria-label="set pitch date button"
              >
                🗓️
              </span>
            )}
          </Button>
        </>
      )}
    </STAC>
  );
};

export default PitchDateSelector;
