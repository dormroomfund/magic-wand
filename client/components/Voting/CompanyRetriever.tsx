import React, { Component } from 'react';
import VotingContainer from '../../containers/VotingContainer';

export interface CompanyRetrieverProps {
  votingContainer: VotingContainer;
  companyId: number;
}

export default class CompanyRetriever extends Component<CompanyRetrieverProps> {
  componentDidMount() {
    const { companyId, votingContainer } = this.props;
    votingContainer.retrieveCompany(companyId);
  }

  render() {
    return null;
  }
}
