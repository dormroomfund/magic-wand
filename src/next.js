/**
 * Setup file for Next.js. We use a custom server to build
 * both the client and server.
 */
import next from 'next';
import routes from '../client/routes';

const dev = process.env.NODE_ENV !== 'production';

export const nextApp = next({
  dir: './client',
  dev,
});

const handle = routes.getRequestHandler(nextApp);

export const nextMiddleware = (app) => {
  app.use(handle);
};
