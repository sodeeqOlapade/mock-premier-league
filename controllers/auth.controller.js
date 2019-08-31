const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const response = require('../helpers/response');

exports.login = (req, res) => {
  try {
    res.json(response('auth', null, { msg: 'errorrr..' }, 404));
  } catch (error) {
    next(error);
  }
};
