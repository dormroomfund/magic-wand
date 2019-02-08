import config from 'config';
import session from 'express-session';
import expressWinston from 'express-winston';
import t from 'tcomb';
import { loggerOptions } from '../logger';

const secret = config.get('authentication.secret');
t.String(secret);

export default (app) => {
  // Session Support (for OAuth)
  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, sameSite: false },
    })
  );

  // Logger
  app.use(
    expressWinston.logger({
      ...loggerOptions,
      expressFormat: true,
      colorize: true,
      ignoreRoute: (req) => {
        if (req.path.startsWith('/_next')) {
          return true;
        }

        return false;
      },
    })
  );
};
