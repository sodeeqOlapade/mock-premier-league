const { Joi } = require('celebrate');

module.exports = {
  create: {
    body: {
      name: Joi.string()
        .min(2)
        .max(120)
        .required(),
      manager: Joi.string()
        .min(2)
        .max(120)
        .required(),
      homeGround: Joi.string()
        .min(2)
        .max(120)
        .required(),
      leaguePosition: Joi.number(),
      homeWin: Joi.number(),
      awayWin: Joi.number(),
      win: Joi.number(),
      loss: Joi.number(),
      draw: Joi.number(),
      points: Joi.number(),
      goals: Joi.number(),
      conceded: Joi.number(),
      isDeleted: Joi.boolean()
    }
  },
  update: {
    body: {
      manager: Joi.string()
        .min(2)
        .max(120)
        .required(),
      homeGround: Joi.string()
        .min(2)
        .max(120)
        .required()
    }
  }
};
