// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
import util from 'util';
import chalk from 'chalk';

import { HookContext } from '@feathersjs/feathers';
import logger from '../logger';

const { gray, blue } = chalk;

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

export default () => (context: HookContext) => {
  // This debugs the service call and a stringified version of the hook context
  // You can customize the message (and logger) to your needs
  // logger.info(
  //   `${context.type}: ${blue(context.method)} ${gray('on service')} ${
  //     context.path
  //   } ${gray('with provider')} ${context.params.provider}`
  // );

  if (typeof (context as any).toJSON === 'function') {
    logger.debug('Hook Context', util.inspect(context, { colors: false }));
  }

  if (context.error && !context.result) {
    logger.error(context.error.stack);
  }
};
