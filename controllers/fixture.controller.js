const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const response = require('../helpers/response');
const Fixture = require('../models/fixture.model');

exports.preLoad = async (req, res, next, id) => {
  try {
    let fixture = await Fixture.getById(id);
    if (fixture && !fixture.deleted) {
      req.fixture = fixture;
      return next();
    }
    return res.json(
      response(
        'No such fixture exists!',
        null,
        { msg: 'No such fixture exist' },
        httpStatus.NOT_FOUND
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { home, away, time } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(home) &&
      !mongoose.Types.ObjectId.isValid(home)
    ) {
      return res.json(
        response(
          'Invalid mongoose id',
          null,
          { msg: 'Invalid mongoose id' },
          httpStatus.BAD_REQUEST
        )
      );
    }

    const fixtureExist = await Fixture.find({ home, away, time });

    if (fixtureExist.length) {
      return res.json(
        response(
          'Bad Request',
          null,
          {
            msg: 'Same Fixture not allowed!'
          },
          httpStatus.BAD_REQUEST
        )
      );
    }

    const fixture = new Fixture(req.body);
    await fixture.save();

    res.json(
      response(
        'Fixture successfully created',
        fixture.transform(),
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
