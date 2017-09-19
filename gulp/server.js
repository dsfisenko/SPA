'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };
  
  var basicAuth = {
	login: 'Admin',
	pwd: 'admiN123$%^'
  };
  
  var authToken = new Buffer(basicAuth.login+':'+basicAuth.pwd).toString('base64');

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  server.middleware = [];
  server.middleware.push(proxyMiddleware('/table/incident', {target: 'https://dev35531.service-now.com/api/now', 
															 changeOrigin: true,
															 onProxyReq: onProxyReq}));
  server.middleware.push(proxyMiddleware('/stats/incident', {target: 'https://dev35531.service-now.com/api/now', 
															 changeOrigin: true,
															 onProxyReq: onProxyReq}));
  
  function onProxyReq(proxyReq, req, res) {
	// add custom header to request 
	proxyReq.setHeader('Authorization', 'Basic '+authToken);
  }
  
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
