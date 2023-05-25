// webpack.config.js

module.exports = {
    // other webpack configuration options...
    resolve: {
      fallback: {
        querystring: require.resolve('querystring')
      }
    }
  };