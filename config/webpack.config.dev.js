
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const publicPath = '/';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'react-dev-utils/webpackHotDevClient',
    'react-hot-loader/patch',
    paths.appIndexJs,
  ],
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: info => path
      .resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: [paths.app, paths.nodeModules],
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.app,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.app,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            test: /\.css$/,
            include: paths.app,
            loaders: ['style-loader', 'css-loader'],
          },
          // Fallback loader
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  performance: {
    hints: false,
  },
};
