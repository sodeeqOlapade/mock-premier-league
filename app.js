const app = require('./config/express');
const connectDb = require('./config/db');


connectDb('mongodb://localhost/mock-premier-league');

if (process.env.NODE_ENV !== 'test') {
  //
  app.listen(5000, () => {
    console.log('Server listening on port 5000');
  });
}




module.exports = app;