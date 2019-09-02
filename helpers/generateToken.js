const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const { jwtExpirationInterval, jwtSecret } = require('../config/env');

const generateToken = id => {
  const payload = {
    exp: moment()
      .add(jwtExpirationInterval, 'days')
      .unix(),
    iat: moment().unix(),
    sub: id
  };
  return jwt.encode(payload, jwtSecret);
};

module.exports = generateToken;
