const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const response = require('../helpers/response');
const Team = require('../models/team.model');

exports.preLoad = async (req, res, next, id) => {
  try {
    let team = await Team.getById(id);
    if (team && !team.deleted) {
      req.team = team;
      return next();
    }
    return res.json(
      response(
        'No such team exists!',
        null,
        { msg: 'No such team exist' },
        httpStatus.NOT_FOUND
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, homeGround } = req.body;

    const teamExist = await Team.find({ $or: [{ name }, { homeGround }] });

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

    res.json(
      response(
        'Team successfully created',
        team.transform(),
        null,
        httpStatus.OK
      )
    );
  } catch (error) {
    next(error);
  }
};


exports.getAll = async (req, res, next) => {
  try {
    let teams = await Team.find({});
    teams = teams.filter(team => {
      if (!team.isDeleted) return team.transform();
    });
    return res.json(
      response('Request for all teams sucessful', teams, null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};

exports.getSingle = async (req, res, next) => {
  try {
    let team = req.team;
    team = team.transform();
    return res.json(response('Request sucessful', team, null, httpStatus.OK));
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let deletedTeam = await Team.deleteOne(req.team._id);
    deletedTeam = deletedTeam.transform();
    return res.json(
      response('Delete sucessful', deletedTeam, null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const team = await req.team.update(req.body);
    res.json(
      response('update succesful', team.transform(), null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};

