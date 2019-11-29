import { Container } from 'unstated';
import { ChildContainer } from '../lib/combineContainers';

export interface PipelineContainerState {
  currentPartner: string;
}

export default class PipelineContainer extends ChildContainer<
  PipelineContainerState
> {
  constructor() {
    super();
    this.state = {
      currentPartner: 'ALL',
    };
  }

  setCurrentPartner(newPartner: string) {
    this.setState({ currentPartner: newPartner });
  }

  // should be state -> so can take param like Team.Philadelphia ... can you do
  // type Team? cf. client/schemas/common.ts
  setCurrentTeamView(newTeamView: string) {
    this.setState({ currentTeamView: newTeamView });
  }
}
