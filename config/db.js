const mongoose = require('mongoose');

async function connectDb(database) {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error(`Error connecting to mongoDB: `, err.message);
    //exit process with failure after error
    process.exit(1);
  }
}

async function dropDb() {
  try {
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error connecting to mongoDB: `, error.message);
    process.exit(1);
  }
}

module.exports = {
  connectDb,
  dropDb
};
