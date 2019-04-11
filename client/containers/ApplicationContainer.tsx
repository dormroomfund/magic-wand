import React, { ComponentType, ReactNode } from 'react';
import { Subscribe } from 'unstated';
import { Subtract } from 'utility-types';
import { combineContainers } from '../lib/combineContainers';
import PipelineContainer from './PipelineContainer';
import CompanyContainer from './CompanyContainer';
import CommentContainer from './CommentContainer';

/** This is the root application state container. */
export default class ApplicationContainer extends combineContainers({
  comments: CommentContainer,
  companies: CompanyContainer,
  pipeline: PipelineContainer,
}) {
  readonly comments: CommentContainer;

  readonly companies: CompanyContainer;

  readonly pipeline: PipelineContainer;
}

//
// Subscribe Component
//
export interface SubscribeToApplicationContainerProps {
  children: (ac: ApplicationContainer) => ReactNode;
}

export const SubscribeToApplicationContainer = ({
  children,
}: SubscribeToApplicationContainerProps) => (
  <Subscribe to={[ApplicationContainer]}>{children}</Subscribe>
);

export const STAC = SubscribeToApplicationContainer;

//
// HOC
//
export interface ApplicationContainerProps {
  applicationContainer: ApplicationContainer;
}

export const withApplicationContainer = <P extends ApplicationContainerProps>(
  Component: ComponentType<P>
) => (props: Subtract<P, ApplicationContainerProps>) => (
  <SubscribeToApplicationContainer>
    {(ac) => <Component {...props as P} applicationContainer={ac} />}
  </SubscribeToApplicationContainer>
);

export const withAC = withApplicationContainer;
