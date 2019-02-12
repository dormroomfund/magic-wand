import { Container } from 'unstated';

export interface PipelineContainerState {
  currentPartner: string;
}

export default class PipelineContainer extends Container<
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
}
