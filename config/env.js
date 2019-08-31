const { Joi } = require('celebrate');

// the dotenv package loads the .env file
require('dotenv').config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(5000),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret Key'),
  JWT_EXPIRATION_INTERVAL: Joi.string()
    .required()
    .description('JWT_EXPIRATION_INTERVAL'),
  MONGO_HOST: Joi.string()
    .required()
    .description('Mongo DB host url'),
  MONGO_HOST_TEST: Joi.string()
    .required()
    .description('Mongo DB host url for testoing'),
  MONGO_PORT: Joi.number().default(27017)
})
  .unknown()
  .required();

const { error, value: envVariables } = Joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  jwtSecret: envVariables.JWT_SECRET,
  jwtExpirationInterval: envVariables.JWT_EXPIRATION_INTERVAL,
  mongo: {
    host:
      process.env.NODE_ENV === 'test'
        ? envVariables.MONGO_HOST_TEST
        : envVariables.MONGO_HOST,
    port: envVariables.MONGO_PORT
  }
};

module.exports = config;
