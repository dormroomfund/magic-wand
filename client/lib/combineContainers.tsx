import { Container as UnstatedContainer } from 'unstated';
import { Class } from 'utility-types';
import _, { mapValues } from 'lodash';

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

    state = {};

    constructor(injected: ContextMap = {}) {
      super();

      this.ctx = mapValues(
        containers,
        (Container, name) => injected[name] || new Container()
      );

      // inject context and listen to container updates
      Object.entries(this.ctx).forEach(([name, container]) => {
        container.ctx = this.ctx;
        container.subscribe(this.handleUpdate(name, container));
      });

      // enable direct access to containers without ctx prefix
      Object.keys(this.ctx).forEach((name) => {
        Object.defineProperty(this, name, {
          get() {
            return this.ctx[name];
          },
        });
      });
    }

    /** Trigger an update on the overall state. */
    private handleUpdate = (name, container) => async () =>
      // This translates to a reference copy in unstated, so no performance hit.
      this.setState({
        [name]: container.state,
      });
  };
