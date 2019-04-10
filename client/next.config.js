/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const config = require('config');
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

const env = process.env.NODE_ENV || 'development';

module.exports = _.flowRight([withImages, withSass, withTypescript])({
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
    sentryDsn: config.get('sentryDsn'),
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
