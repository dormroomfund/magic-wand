import { Component, ComponentClass, ComponentType } from 'react';
import { Subscribe } from 'unstated';
import { Subtract } from 'utility-types';
import VotingContainer from '../containers/VotingContainer';

export interface VotingContainerProps {
  votingContainer: VotingContainer;
}

export const withVotingContainer = <P extends VotingContainerProps>(
  Component: ComponentType<P>
) => (props: Subtract<P, VotingContainerProps>) => (
  <Subscribe to={[VotingContainer]}>
    {(vc: VotingContainer) => (
      <Component {...props as P} votingContainer={vc} />
    )}
  </Subscribe>
);
