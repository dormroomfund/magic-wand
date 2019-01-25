const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer)
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          // @ts-ignore
          useTypescriptIncrementalApi: true,
          measureCompilationTime: true,
        })
      );

    return config;
  },
});
