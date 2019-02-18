// import Sentry from '@sentry/node';
import t from 'tcomb';
import util from 'util';
import app from './app';
import logger from './logger';
import { nextApp } from './next';

// if (app.get('sentryDsn')) {
//   Sentry.init({ dsn: app.get('sentryDsn') });
// }

const port = app.get('port');
t.Integer(port);

nextApp.prepare().then(async () => {
  const server = app.listen(port);

  server.on('listening', () => {
    logger.info('application started on http://%s:%d', app.get('host'), port);
  });
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(
    'Unhandled Rejection at: Promise ',
    util.format(p),
    util.format(reason)
  );
});
