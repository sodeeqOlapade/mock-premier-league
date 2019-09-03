const { Joi } = require('celebrate');

module.exports = {
  createOrUpdateFixture: {
    body: {
      home: Joi.string()
        .min(2)
        .max(120)
        .required(),
      away: Joi.string()
        .min(2)
        .max(120)
        .required(),
      Venue: Joi.string()
        .min(2)
        .max(120)
        .required(),
      time: Joi.string()
        .min(2)
        .max(20)
        .required(),
      date: Joi.string()
        .min(2)
        .max(20)
        .required(),
      refree: Joi.string()
        .min(2)
        .max(120)
        .required(),
      winner: Joi.string()
        .min(2)
        .max(120),
      firstHalfScore: Joi.number(),
      secondHalfScore: Joi.number(),
      homeTotalGoal: Joi.number(),
      awayTotalGoal: Joi.number(),
      fullTimeScore: Joi.number(),
      isDraw: Joi.boolean(),
      status: Joi.string()
    }
  }
};
