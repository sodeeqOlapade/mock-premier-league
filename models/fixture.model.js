const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const pick = require('ramda/src/pick');
const APIError = require('../helpers/APIError');
const response = require('../helpers/response');
const Team = require('../models/team.model');

const FixtureSchema = new mongoose.Schema(
  {
    home: {
      type: mongoose.Types.ObjectId,
      required: true,
      refs: 'Team'
    },
    away: {
      type: mongoose.Types.ObjectId,
      required: true,
      refs: 'Team'
    },
    venue: {
      type: String,
      minlength: 2,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    firstHalfScore: {
      type: Number,
      default: 0
    },
    secondHalfScore: {
      type: Number,
      default: 0
    },
    homeTotalGoal: {
      type: Number,
      default: 0
    },
    awayTotalGoal: {
      type: Number,
      default: 0
    },
    fullTimeScore: {
      type: Number,
      default: 0
    },
    refree: {
      type: String,
      minlength: 2,
      required: true
    },
    winner: {
      type: mongoose.Types.ObjectId,
      refs: 'Team',
      default: null
    },
    isDraw: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['pending', 'live', 'completed', 'postponed'],
      default: 'pending'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

FixtureSchema.pre('save', async function(next) {
  if (this.status === 'completed') {
    const homeTeam = await Team.getById(this.home);
    const awayTeam = await Team.getById(this.away);

    //updating total number of games played by each team
    homeTeam.games += 1;
    awayTeam.games += 1;

    homeTeam.goals += this.homeTotalGoal;
    awayTeam.goals += this.awayTotalGoal;

    homeTeam.conceded += this.awayTotalGoal;
    awayTeam.conceded += this.homeTotalGoal;

    homeTeam.goalDifference = homeTeam.goals - homeTeam.conceded;
    awayTeam.goalDifference = awayTeam.goals - awayTeam.conceded;

    if (this.isDraw) {
      //update draw counts on teams
      homeTeam.draw += 1;
      awayTeam.draw += 1;

      //update points after win
      homeTeam.points += 1;
      awayTeam.points += 1;
    }

    if (this.winner.toString() === homeTeam.id.toString()) {

      /**
       * update win count for home team
       * and loss count for away team
       */
      homeTeam.win += 1;
      awayTeam.loss += 1;

      //update points for team
      homeTeam.points += 3;

      //update homeWins for home team
      //update awayLoss for away team
      homeTeam.homeWin += 1;
      awayTeam.awayLoss += 1;
    }

    if (this.winner.toString() === awayTeam.id.toString()) {

      /**
       * update win count for away team
       * and loss count for home team
       */
      awayTeam.win += 1;
      homeTeam.loss += 1;

      //update points for team
      awayTeam.points += 3;

      //update awayWin for away team
      //update homeLoss for home team
      awayTeam.awayWin += 1;
      homeTeam.homeLoss += 1;
    }

    homeTeam.save();
    awayTeam.save();
    next();
  }
});

FixtureSchema.methods = {
  /**
   * Returns fixture object with only selected fields
   */
  transform() {
    // add feilds to be selected
    const fields = [
      'id',
      'home',
      'away',
      'venue',
      'time',
      'date',
      'firstHalfScore',
      'secondHalfScore',
      'homeTotalGoal',
      'awayTotalGoal',
      'fullTimeScore',
      'refree',
      'winner',
      'isDraw',
      'status',
      'isDeleted'
    ];
    return pick(fields, this);
  },

  /**
   *
   * @param {req.body} obj
   * this method does the fixture update
   * it's available on every instance
   */
  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }
    await this.save();
    return this;
  }
};

FixtureSchema.statics = {
  async getById(id) {
    try {
      /**
       * this ensures that the incoming id is
       * a valid mongoose id
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError({
          message: 'No such fixture exist'
        });
      }
      const fixture = await this.findById(id).exec(); //returns user if found otherwise null
      if (fixture) {
        return fixture;
      }
      return fixture; //fixture will be null here
    } catch (error) {
      throw new APIError(error);
    }
  },

  async deleteOne(id) {
    const fixture = await this.findByIdAndRemove(id);
    return fixture;
  }
};

module.exports = mongoose.model('Fixture', FixtureSchema);
