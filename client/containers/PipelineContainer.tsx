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
}
