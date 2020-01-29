import { Container } from 'unstated';
import { ChildContainer } from '../lib/combineContainers';

export interface PipelineContainerState {
  currentPartnerId: string;
  currentTeam: string;
}

export default class PipelineContainer extends ChildContainer<
  PipelineContainerState
> {
  constructor() {
    super();
    this.state = {
      currentPartnerId: 'ALL',
      currentTeam: 'default',
    };
  }

  setCurrentPartner(newPartnerId: string) {
    this.setState({ currentPartnerId: newPartnerId });
  }

  setCurrentTeamView(newTeam: string) {
    this.setState({ currentTeam: newTeam });
  }
}
