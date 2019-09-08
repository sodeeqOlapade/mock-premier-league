const app = require('./config/express');
const db = require('./config/db')
const config = require('./config/env');

db.connectDb(config.mongo.host);

if (process.env.NODE_ENV !== 'test') {
  //
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port} `);
  });
}

module.exports = app;
