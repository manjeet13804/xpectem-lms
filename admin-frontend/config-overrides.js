module.exports = function override(config, env) {
  if (env === 'production') {
    config.devtool = false;
  }
  return config;
};


const rewireSass = require('react-app-rewire-scss');

module.exports = function override(config, env) {
  config = rewireSass(config, env);

  if (env === 'production') {
    config.devtool = false;
  }
  return config;
};