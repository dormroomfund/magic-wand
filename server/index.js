import util from 'util';
import logger from './logger';
import app from './app';
import { nextApp } from './next';

const port = app.get('port');

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
