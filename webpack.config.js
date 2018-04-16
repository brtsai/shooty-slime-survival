// webpack.config.js
var path = require('path');

module.exports = {
  entry: './javascript/entry.js',
  output: {
    filename: './bundle.js',
  },
  module: {
  },
  resolve: {
    extensions: ['.js']
  }
};
