import { JSONSchema6 } from 'json-schema';
import { omit, pick } from 'lodash';
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
} from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import styled from 'styled-components';
import {
  ApplicationContainerProps,
  withAC,
} from '../../containers/ApplicationContainer';
import { companySchema, Company } from '../../schemas/company';
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

type CompanyPitchDate = Pick<Company, 'pitchDate'>;

const FormWrapper = styled.div`
  .form-group {
    margin-top: 0.125em;
    margin-bottom: 0.375em;
  }
`;

export interface SelectorProps {
  ref: MutableRefObject<any>;
  onClick: () => void;
}

export interface PitchDateSelectorProps {
  companyId: number;
  /** Displayed when popover shown. */
  showText: (SelectorProps) => ReactNode;
  /** Displayed when popover hidden. */
  hideText: (SelectorProps) => ReactNode;
  /** Displayed when popover hidden and a pitch date has been selected. */
  selectedText: (SelectorProps) => ReactNode;
}

const PitchDateSelector = withAC(
  ({
    companyId,
    applicationContainer: ac,
    showText,
    hideText,
    selectedText,
  }: PitchDateSelectorProps & ApplicationContainerProps) => {
    const target = useRef(null);
    const [show, setShow] = useState(false);
    const company = ac.companies.get(companyId);

    useEffect(
      () => {
        ac.companies.retrieve(companyId);
      },
      [ac.companies, companyId]
    );

    const handleSubmit = async ({
      formData: _formData,
    }: ISubmitEvent<CompanyPitchDate>) => {
      await ac.companies.patch(companyId, _formData);
      setShow(false);
    };

    const handleReset = async () => {
      await ac.companies.patch(companyId, { pitchDate: null });
      setShow(false);
    };

    let SelectorButton: ReactNode;
    if (!show) {
      if (company && company.pitchDate) {
        SelectorButton = selectedText({
          ref: target,
          onClick: () => setShow(true),
          company,
        });
      } else {
        SelectorButton = hideText({
          ref: target,
          onClick: () => setShow(true),
          company,
        });
      }
    } else {
      SelectorButton = showText({
        ref: target,
        onClick: () => setShow(false),
        company,
      });
    }

    const form = (
      <FormWrapper>
        <Form
          schema={pitchSchema}
          uiSchema={uiSchema}
          formData={pick(company, 'pitchDate')}
          onSubmit={handleSubmit}
          className="clearfix"
        >
          <ButtonGroup className="float-right">
            {company && company.pitchDate && (
              <Button onClick={handleReset} variant="danger">
                Unset
              </Button>
            )}
            <Button type="submit">Set Date</Button>
          </ButtonGroup>
        </Form>
      </FormWrapper>
    );

    return (
      <>
        {SelectorButton}
        <Overlay target={target.current} show={show} placement="bottom">
          {({ show: _show, ...props }) => (
            <Popover
              id="popover-pitch-date"
              title={
                company && company.pitchDate
                  ? 'Select Pitch Date'
                  : 'Pitch Date Selected'
              }
              {...props}
            >
              {form}
            </Popover>
          )}
        </Overlay>
      </>
    );
  }
);

export default PitchDateSelector;
