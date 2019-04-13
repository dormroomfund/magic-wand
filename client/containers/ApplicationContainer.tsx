import React, { ComponentType, ReactNode } from 'react';
import { Subscribe } from 'unstated';
import { Subtract } from 'utility-types';
import { authenticate } from '../lib/authentication';
import { combineContainers } from '../lib/combineContainers';
import CommentContainer from './CommentContainer';
import CompanyContainer from './CompanyContainer';
import PipelineContainer from './PipelineContainer';
import UserContainer from './UserContainer';

/** This is the root application state container. */
export default class ApplicationContainer extends combineContainers({
  comments: CommentContainer,
  companies: CompanyContainer,
  pipeline: PipelineContainer,
  users: UserContainer,
}) {
  readonly comments: CommentContainer;

  readonly companies: CompanyContainer;

  readonly pipeline: PipelineContainer;

  readonly users: UserContainer;

  constructor() {
    super();

    if (process.browser) {
      authenticate();
    }
  }
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
