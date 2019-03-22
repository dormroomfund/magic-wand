import React, { Component } from 'react';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteType } from '../../schemas/vote';
import { differenceWith } from 'lodash';
import Table from 'react-bootstrap/lib/Table';
import { PartnerVoteObj, archivedStates } from '../../schemas/company';
import Button from 'react-bootstrap/lib/Button';
import UserContainer from '../../containers/UserContainer';
import { Subscribe } from 'unstated';
import VotingCompletionTable from './VotingCompletionTable';
import CompanyRetriever from './CompanyRetriever';

export interface VotingCompletionProps {
  companyId: number;
}

export default ({ companyId }: VotingCompletionProps) => (
  <Subscribe to={[UserContainer, VotingContainer]}>
    {(uc: UserContainer, vc: VotingContainer) => {
      const prevotedPartners = vc.votedPartners(companyId, VoteType.Prevote);
      const finalVotedPartners = vc.votedPartners(companyId, VoteType.Final);
      const waitingOnPartners = differenceWith(
        prevotedPartners,
        finalVotedPartners,
        (a, b) => a.partner_id === b.partner_id
      );

      if (
        vc.votingStatus(companyId, uc.user.id) !==
          VotingStatus.AwaitingFinalization ||
        prevotedPartners.length === 0 ||
        finalVotedPartners.length === 0
      ) {
        return null;
      }

      return (
        <>
          <CompanyRetriever companyId={companyId} votingContainer={vc} />
          <p>The following partners have submitted final votes.</p>
          <VotingCompletionTable
            companyId={companyId}
            votes={finalVotedPartners}
            votingContainer={vc}
          />
          {waitingOnPartners.length > 0 ? (
            <>
              <p>
                The following partners have submitted a prevote but not a final
                vote:
              </p>
              <VotingCompletionTable
                companyId={companyId}
                votes={waitingOnPartners}
                votingContainer={vc}
              />
            </>
          ) : (
            (vc.votingStatus(companyId, uc.user.id) !==
              VotingStatus.AwaitingFinalization ||
              uc.user.partner_position !== 'Managing Partner') && (
              <Button
                onClick={() => vc.finalizeVotes(companyId)}
                disabled={
                  vc.votingStatus(companyId, uc.user.id) ===
                  VotingStatus.VotingFinalized
                }
              >
                Finalize Votes
              </Button>
            )
          )}
        </>
      );
    }}
  </Subscribe>
);
