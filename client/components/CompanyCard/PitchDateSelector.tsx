import { JSONSchema6 } from 'json-schema';
import { omit, pick } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Form from 'react-jsonschema-form-bs4';
import styled from 'styled-components';
import {
  ApplicationContainerProps,
  withAC,
} from '../../containers/ApplicationContainer';
import { companySchema } from '../../schemas/company';
import { pick as schemaPick } from '../../schemas/_utils';

const pitchSchema = omit(
  schemaPick(companySchema as JSONSchema6, ['pitchDate']),
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

const PitchDateSelector = withAC(
  ({
    companyId,
    applicationContainer: ac,
  }: PitchDateSelectorProps & ApplicationContainerProps) => {
    const target = useRef(null);
    const [show, setShow] = useState(false);
    const company = ac.companies.get(companyId);

    useEffect(
      () => {
        ac.companies.retrieve(companyId);
      },
      [companyId]
    );

    const handleSubmit = async ({ formData: _formData }) => {
      await ac.companies.patch(companyId, _formData);
      setShow(false);
    };

    const handleReset = async () => {
      await ac.companies.patch(companyId, { pitchDate: null });
      setShow(false);
    };

    return (
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
                  formData={pick(company, 'pitchDate')}
                  onSubmit={handleSubmit}
                  className="clearfix"
                >
                  <ButtonGroup className="float-right">
                    {company.pitchDate && (
                      <Button onClick={handleReset} variant="danger">
                        Unset
                      </Button>
                    )}
                    <Button type="submit">Set Date</Button>
                  </ButtonGroup>
                </Form>
              </FormWrapper>
            </Popover>
          )}
        </Overlay>
        <Button
          variant={company && company.pitchDate ? 'success' : 'secondary'}
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
    );
  }
);

export default PitchDateSelector;
