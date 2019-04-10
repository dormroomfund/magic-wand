import React from 'react';
import { Subscribe } from 'unstated';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
import VotingContainer from '../../containers/VotingContainer';
import VotingCompletion from './VotingCompletion';
import VotingWorkflow from './VotingWorkflow';

interface VotingProps {
  companyID: number;
}

export default ({ companyID }: VotingProps) => (
  <Subscribe to={[VotingContainer, CurrentUserContainer]}>
    {(vc: VotingContainer, cuc: CurrentUserContainer) => {
      const company = vc.company(companyID);
      return (
        <div>
          <h1>{company && company.name}</h1>
          <h2>
            Status:
            {company && company.status}
          </h2>
          <VotingWorkflow companyId={companyID} />
          <VotingCompletion companyId={companyID} />
        </div>
      );
    }}
  </Subscribe>
);
