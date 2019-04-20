// Modal for adding links to the company
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import Form from 'react-jsonschema-form';
import { Company, companyLinkSchema } from '../../../schemas/company';

const log = (type) => console.log.bind(console, type);

export interface LinksViewerModalProps {
  /** The company we're adding links too. */
  company: Company;

  show?: boolean;

  onHide?: () => void;
  addLink?: ({ formData }) => void;
}

export default ({ company, show, onHide, addLink }: LinksViewerModalProps) => (
  <Modal show={show} centered backdrop onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title as="h5">Add link to {company.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        schema={companyLinkSchema}
        onSubmit={addLink}
        onError={log('errors')}
      />
    </Modal.Body>
  </Modal>
);
