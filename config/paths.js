const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  app: resolvePath('src'),
  appIndexJs: resolvePath('src/index.jsx'),
  appHtml: resolvePath('public/index.html'),
  appPublic: resolvePath('public'),
  dist: resolvePath('dist'),
  publicPath: resolvePath('/'),
  nodeModules: resolvePath('node_modules'),
  appPackageJson: resolvePath('package.json'),
};
