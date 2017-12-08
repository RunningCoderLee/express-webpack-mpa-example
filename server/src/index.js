import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import debug from 'debug';
import http from 'http';
import config from 'config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import paths from '../../helper/paths';
import webpackDevConfig from '.././../client/config/webpack.config.dev';


// const debugType = debug('express-webpack-mpa-example:server');
const app = express();

const isDev = process.env.NODE_ENV === 'development';


// view engine setup
app.set('views', paths.server.views);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


if (isDev) {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    // publicPath is required, whereas all other options are optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    // lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true,
    // },
    // watch options (only lazy: false)

    publicPath: webpackDevConfig.output.publicPath,
    // public path to bind the middleware to
    // use the same as in webpack

    // index: 'index.html',
    // The index path for web server, defaults to "index.html".
    // If falsy (but not undefined), the server will not respond to requests to the root URL.

    // headers: { 'X-Custom-Header': 'yes' },
    // custom headers

    // mimeTypes: { 'text/html': ['phtml'] },
    // Add custom mime/extension mappings
    // https://github.com/broofa/node-mime#mimedefine
    // https://github.com/webpack/webpack-dev-middleware/pull/150

    stats: {
      colors: true,
    },
    // options for formating the statistics

    // reporter: null,
    // Provide a custom reporter to change the way how logs are shown.

    // serverSideRender: false,
    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
  }));

  app.use(webpackHotMiddleware(compiler));

  require('./routes')(app); // eslint-disable-line

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!\n');
  });
} else {
  app.use(express.static(paths.static));

  /**
   * Get port from environment and store in Express.
   */
  const port = config.server.service;
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
}
