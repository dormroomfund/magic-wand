// This is how we override the default Ant design Theme

// react-app-rewired allows customization of webpack without ejecting
const { injectBabelPlugin } = require('react-app-rewired');

// react-app-rewire-less allows us to modify less variables with tools such as less-loader
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#0702d1', 'font-family': 'Circularstd' },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
