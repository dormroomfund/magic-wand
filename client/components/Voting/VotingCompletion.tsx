import { differenceWith } from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Subscribe } from 'unstated';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
import VotingContainer, {
  VotingStatus,
} from '../../containers/VotingContainer';
import { VoteType } from '../../schemas/vote';
import CompanyRetriever from './CompanyRetriever';
import VotingCompletionTable from './VotingCompletionTable';
import { Position } from '../../schemas/user';

export interface VotingCompletionProps {
  companyId: number;
}

export default ({ companyId }: VotingCompletionProps) => (
  <Subscribe to={[CurrentUserContainer, VotingContainer]}>
    {(cuc: CurrentUserContainer, vc: VotingContainer) => {
      const prevotedPartners = vc.votedPartners(companyId, VoteType.Prevote);
      const finalVotedPartners = vc.votedPartners(companyId, VoteType.Final);
      const waitingOnPartners = differenceWith(
        prevotedPartners,
        finalVotedPartners,
        (a, b) => a.partnerId === b.partnerId
      );

      if (
        vc.votingStatus(companyId, cuc.user.id) !==
          VotingStatus.AwaitingFinalization ||
        prevotedPartners.length === 0 ||
        finalVotedPartners.length === 0
      ) {
        return null;
      }

      return (
        <>
          <CompanyRetriever companyId={companyId} />
          <p>The following partners have submitted final votes.</p>
          <VotingCompletionTable
            companyId={companyId}
            votes={finalVotedPartners}
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
              />
            </>
          ) : (
            (vc.votingStatus(companyId, cuc.user.id) ===
              VotingStatus.AwaitingFinalization ||
              cuc.user.partnerPosition === Position.ManagingPartner) && (
              <Button
                onClick={() => vc.finalizeVotes(companyId)}
                disabled={
                  vc.votingStatus(companyId, cuc.user.id) ===
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
