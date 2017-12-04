'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  client: {
    dist: resolveApp('static/dist'),
    pages: resolveApp('client/src/pages'),
    src: resolveApp('client/src'),
    root: resolveApp('client'),
  },
  helper: resolveApp('helper'),
  server: {
    dist: resolveApp('server/dist'),
    root: resolveApp('server'),
    routes: resolveApp('server/src/routes'),
    src: resolveApp('server/src'),
    views: resolveApp('server/views'),
  },
  static: resolveApp('static'),
  packageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  nodeModules: resolveApp('node_modules'),
};
