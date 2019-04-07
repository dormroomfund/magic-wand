import { Container as UnstatedContainer } from 'unstated';
import { Class } from 'utility-types';

export interface ContextMap {
  [key: string]: ChildContainer<object, ContextMap>;
}
export interface ContextClassMap {
  [key: string]: Class<ChildContainer<object, ContextMap>>;
}

export class ChildContainer<
  State extends object,
  Context extends ContextMap = ContextMap
> extends UnstatedContainer<State> {
  ctx: Context;
}

/**
 * Inspired by https://github.com/fabiospampinato/unstated-compose/
 */
export const combineContainers = (containers: ContextClassMap) =>
  class CombinedContainer extends UnstatedContainer<{}> {
    ctx: ContextMap;

    constructor(injectedContainers: ContextMap = {}) {
      super();

      this.state = {};
      this.ctx = {};

      Object.entries(containers).forEach(([name, Container]) => {
        let container: ChildContainer<object>;
        if (injectedContainers[name] instanceof Container) {
          container = injectedContainers[name];
        } else {
          container = new Container();
        }

        container.ctx = this.ctx;

        // child container updates should trigger overall state change
        const rawSetState = container.setState;
        container.setState = async (...args) => {
          await rawSetState.call(container, ...args);
          this.setState({});
        };

        this.ctx[name] = container;
        Object.defineProperty(this, name, {
          get() {
            return this.ctx[name];
          },
        });
      });
    }
  };
