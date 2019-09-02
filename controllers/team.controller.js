const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const response = require('../helpers/response');
const Team = require('../models/team.model');

exports.create = async (req, res, next) => {
  try {
    const { name, homeGround } = req.body;

    const teamExist = await Team.find({ $or: [{ name }, { homeGround }] });
    console.log(teamExist.length);

    if (teamExist.length) {
      return res.json(
        response(
          'Bad Request',
          null,
          {
            msg: 'Team name or homeground already in use!'
          },
          httpStatus.BAD_REQUEST
        )
      );
    }

    const team = new Team(req.body);
    await team.save();

    res.json(response('Team successfully created', team, null, httpStatus.OK));
  } catch (error) {
    next(error);
  }
};
