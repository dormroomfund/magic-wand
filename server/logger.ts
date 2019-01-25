import config from 'config';
import { createLogger, format, transports } from 'winston';
import colors from 'colors';

// https://stackoverflow.com/a/53231561
const errorStackTracerFormat = format((info) => {
  if (info.meta && info.meta instanceof Error) {
    info.message = `${info.message} ${info.meta.stack}`;
  }

  return info;
});

export const loggerOptions = {
  level: config.get('loglevel'),
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'HH:mm:ss' }),
    format.splat(),
    errorStackTracerFormat(),
    format.printf(
      (info) =>
        `[${info.level}] ${colors.dim(`${info.timestamp}:`)} ${
          info.message
        } \n ${info.meta && info.meta.join('\n')}`
    )
  ),
  transports: [new transports.Console()],
};

// Configure the Winston logger.
// For the complete documentation see https://github.com/winstonjs/winston
export default createLogger(loggerOptions);
