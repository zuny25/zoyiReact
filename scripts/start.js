/* eslint-disable no-console */
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');


if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';


choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);

    const compiler = createCompiler(webpack, config, appName, urls);

    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig,
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      console.log('Starting the development server...\n');
      return openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
