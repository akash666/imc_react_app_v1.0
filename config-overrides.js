// config-overrides.js
const path = require('path');
const customConfig = require('./webpack.config.js');

module.exports = {
    webpack: function (config, env) {
      // Update the resolve.fallback configuration
      config.resolve.fallback = {
     
        querystring: false
      };
      return config;
    }
  };