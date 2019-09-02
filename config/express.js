const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const wiston = require('./winston');
const winstonInstance = require('./winstonInstance');
const expressWinston = require('express-winston');
const routes = require('../routes');
const error = require('./error');
const logger = require('morgan');
const { env } = require('./env');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// enable detailed API logging in dev env
//comment this code to reduce api logs
if (env === 'development') {
  app.use(logger('dev'));
  expressWinston.responseWhitelist.push('body');
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg:
        'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

app.use(wiston);
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

if (env !== 'test') {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  );
}

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
