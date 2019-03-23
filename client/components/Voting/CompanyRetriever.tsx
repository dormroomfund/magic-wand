import React, { Component } from 'react';
import VotingContainer from '../../containers/VotingContainer';
import { withVotingContainer } from '../../lib/containers';

export interface CompanyRetrieverProps {
  votingContainer: VotingContainer;
  companyId: number;
}

class CompanyRetriever extends Component<CompanyRetrieverProps> {
  componentDidMount() {
    const { companyId, votingContainer } = this.props;
    votingContainer.retrieveCompany(companyId);
  }

  render() {
    return null;
  }
}

export default withVotingContainer(CompanyRetriever);
