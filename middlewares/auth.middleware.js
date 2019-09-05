const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/user.model');
const response = require('../helpers/response');
const decodeToken = require('../helpers/decodeToken');

const auth = async (req, res, next) => {
  try {
    const { payload } = decodeToken(req, res);
    const { sub } = payload;
    const user = await User.getById(sub);
    if (user) {
      req.sub = sub;
      req.user = user;
      return next();
    }

    return res.json(
      response('Please Login', null, null, httpStatus.UNAUTHORIZED)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = auth
