const { Joi } = require('celebrate');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const response = require('../helpers/response');
const Fixture = require('../models/fixture.model');
const Team = require('../models/team.model');

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
    if (home === away) {
      {
        return res.json(
          response(
            'Same team cannot be in home and away position',
            null,
            { msg: 'Same team cannot be in home and away position' },
            httpStatus.BAD_REQUEST
          )
        );
      }
    }

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
    let fixtures = await Fixture.find({});
    fixtures = fixtures.filter(fixture => {
      if (!fixture.isDeleted) return fixture.transform();
    });
    return res.json(
      response(
        'Request for all fixtures sucessful',
        fixtures,
        null,
        httpStatus.OK
      )
    );
  } catch (error) {
    next(error);
  }
};

exports.getSingle = async (req, res, next) => {
  try {
    let fixture = req.fixture;
    fixture = fixture.transform();
    return res.json(
      response('Request sucessful', fixture, null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let deletedFixture = await Fixture.deleteOne(req.fixture._id);
    deletedFixture = deletedFixture.transform();
    return res.json(
      response('Delete sucessful', deletedFixture, null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { home, away } = req.fixture

    const fixture = await req.fixture.update(req.body);
    if (fixture.status === 'completed') {
      let teams = await Team.find({});
      teams = teams.sort((a, b) => {
        if (a.points === b.points) {
          return b.goalDifference - a.goalDifference;
        }
        return b.points - a.points;
      });
      teams = teams.map(team => team.id.toString());

      const homeTeam = await Team.getById(home);
      const awayTeam = await Team.getById(away);

      homeTeam.leaguePosition = teams.indexOf(homeTeam.id.toString()) + 1;
      awayTeam.leaguePosition = teams.indexOf(awayTeam.id.toString()) + 1;

      homeTeam.save();
      awayTeam.save();
    }
    res.json(
      response('update succesful', fixture.transform(), null, httpStatus.OK)
    );
  } catch (error) {
    next(error);
  }
};
