import { Paginated } from '@feathersjs/feathers';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import { ISubmitEvent } from 'react-jsonschema-form-bs4';
import { Subscribe } from 'unstated';
import VotingContainer from '../../containers/VotingContainer';
import client from '../../lib/client';
import { archivedStates, Company, PartnerVoteObj } from '../../schemas/company';
import { Vote } from '../../schemas/vote';
import VotingCompletion from './VotingCompletion';
import VotingWorkflow from './VotingWorkflow';

interface VotingProps {
  companyID: number;
}

export default ({ companyID }: VotingProps) => (
  <Subscribe to={[VotingContainer]}>
    {(vc: VotingContainer) => {
      const company = vc.company(companyID);
      return (
        <div>
          <h1>{company && company.name}</h1>
          <h2>Status: {company && company.status}</h2>
          <VotingWorkflow companyId={companyID} votingContainer={vc} />
          <VotingCompletion companyId={companyID} votingContainer={vc} />
        </div>
      );
    }}
  </Subscribe>
);
