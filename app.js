const app = require('./config/express');
const connectDb = require('./config/db');
const config = require('./config/env');

connectDb(config.mongo.host);

if (process.env.NODE_ENV !== 'test') {
  //
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port} `);
  });
}

module.exports = app;
