const config = require('config');
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = withTypescript({
  publicRuntimeConfig: {
    rootUrl: config.get('rootUrl'),
    env,
    authentication: {
      path: config.get('authentication.path'),
      entity: config.get('authentication.entity'),
      service: config.get('authentication.service'),
      auth0: {
        clientID: config.get('authentication.auth0.clientID'),
        callbackURL: config.get('authentication.auth0.callbackURL'),
        domain: config.get('authentication.auth0.domain'),
        logoutRedirect: config.get('authentication.auth0.logoutRedirect'),
      },
    },
  },

  webpack(cfg, options) {
    // Do not run type checking twice:
    if (options.isServer)
      cfg.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          // @ts-ignore
          useTypescriptIncrementalApi: true,
          measureCompilationTime: true,
        })
      );

    return cfg;
  },
});
