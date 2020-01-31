import { Container } from 'unstated';
import { ChildContainer } from '../lib/combineContainers';

export interface PipelineContainerState {
  currentPartnerFirstName: string;
  currentTeam: string;
}

export default class PipelineContainer extends ChildContainer<
  PipelineContainerState
> {
  constructor() {
    super();
    this.state = {
      currentPartnerFirstName: 'ALL',
      // current user's team
      currentTeam: 'All',
    };
  }

  setCurrentPartnerFirstName(newPartnerFirstName: string) {
    this.setState({ currentPartnerFirstName: newPartnerFirstName });
  }

  setCurrentTeamView(newTeam: string) {
    this.setState({ currentTeam: newTeam });
  }
}
