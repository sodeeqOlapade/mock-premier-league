const  mongoose = require('mongoose');

module.exports = async (database) => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
 
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error(`Error connecting to mongoDB: `, err.message);
    //exit process with failure after error
    process.exit(1);
  }
};


