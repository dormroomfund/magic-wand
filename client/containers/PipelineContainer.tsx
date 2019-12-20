import { Container } from 'unstated';
import { ChildContainer } from '../lib/combineContainers';

export interface PipelineContainerState {
  currentPartner: string;
  currentTeam: string;
}

export default class PipelineContainer extends ChildContainer<
  PipelineContainerState
> {
  constructor() {
    super();
    this.state = {
      currentPartner: 'ALL',
      currentTeam: 'default',
    };
  }

  setCurrentPartner(newPartner: string) {
    this.setState({ currentPartner: newPartner });
  }

  setCurrentTeamView(newTeam: string) {
    this.setState({ currentTeam: newTeam });
  }
}
