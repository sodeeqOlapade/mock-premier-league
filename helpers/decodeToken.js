const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { jwtSecret } = require('../config/env');

const decodeToken = req => {
  const authorization = req.headers['authorization']; //pull out authorization from header
  if (!authorization) {
    throw new Error({
      message: 'Unauthorized',
      status: httpStatus.UNAUTHORIZED
    });
  }
  const token = authorization.split(' ')[1];
  return { payload: jwt.decode(token, jwtSecret) };
};

module.exports = decodeToken;
