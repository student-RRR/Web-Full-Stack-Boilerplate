const webpackValidator = require('webpack-validator');
const { getIfUtils } = require('webpack-config-utils');
const path = require('path');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  const config = webpackValidator({
    entry: {
      bundle: './src/index.js',
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public/bundle'),
      publicPath: '/public/bundle/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass',
        },
      ],
    },
  });
  return config;
};
