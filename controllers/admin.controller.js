const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const response = require('../helpers/response');
const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
  try {
    const { email } = req.body;

    //checking if user exists
    let userExist = await User.getByEmail(email);
    if (userExist) {
      return res.json(
        response(
          'Bad Request',
          null,
          {
            msg: 'Email already in use!'
          },
          httpStatus.BAD_REQUEST
        )
      );
    }

    //user doesn't exist go ahead with creating new user
    const user = new User({ ...req.body, isAdmin: true });

    await user.save();
    const token = await user.getToken();

    res.json(
      response(
        'User successfully created',
        user.transform(),
        null,
        httpStatus.OK,
        token
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, accessToken: token } = await User.loginAndGenerateToken(
      req.body
    );
    return res.json(
      response(
        'Successfully logged in',
        user.transform(),
        null,
        httpStatus.OK,
        token
      )
    );
  } catch (error) {
    next(error);
  }
};
