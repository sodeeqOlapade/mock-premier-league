const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { jwtSecret } = require('../config/env');
const response = require('../helpers/response');
const APIError = require('../helpers/APIError');

const decodeToken = (req, res) => {
  const authorization = req.headers['authorization']; //pull out authorization from header
  if (!authorization) {
    throw new APIError({
      message: 'Unauthorized',
      status: httpStatus.UNAUTHORIZED
    });
  }
  const token = authorization.split(' ')[1];
  return { payload: jwt.decode(token, jwtSecret) };
};

module.exports = decodeToken;
