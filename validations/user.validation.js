const { Joi } = require('celebrate');

module.exports = {
  createUser: {
    body: {
      name: Joi.string()
        .min(2)
        .max(120)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .max(20)
        .required(),
      isAdmin: Joi.boolean()
    }
  },
  loginUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }
  }
};
