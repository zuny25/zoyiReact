
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');

const publicPath = '/';

module.exports = {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  entry: [
    paths.appIndexJs,
  ],
  output: {
    path: paths.dist,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: '' }),
    new CopyWebpackPlugin([{ from: paths.appHtml, to: paths.dist }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};
