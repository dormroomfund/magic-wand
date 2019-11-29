import { Container } from 'unstated';
import { ChildContainer } from '../lib/combineContainers';

export interface PipelineContainerState {
  currentPartner: string;
  currentTeam: string; // 1/ can I use enum Team here, or stick w strings?
}

export default class PipelineContainer extends ChildContainer<
  PipelineContainerState
> {
  constructor() {
    super();
    this.state = {
      currentPartner: 'ALL',
      currentTeam: 'Boston', // 2/ can I use cuc here to do cuc.user.team, or how do I get the current user's current team?
    };
  }

  setCurrentPartner(newPartner: string) {
    this.setState({ currentPartner: newPartner });
  }

  setCurrentTeamView(newTeam: string) {
    this.setState({ currentTeam: newTeam });
  }
}
