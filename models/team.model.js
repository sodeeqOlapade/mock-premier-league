const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const pick = require('ramda/src/pick');
const APIError = require('../helpers/APIError');
const response = require('../helpers/response');

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
      unique: true
    },
    manager: {
      type: String,
      minlength: 2,
      required: true
    },
    homeGround: {
      type: String,
      minlength: 2,
      required: true
    },
    leaguePosition: {
      type: Number,
      default: 0
    },
    homeWin: {
      type: Number,
      default: 0
    },
    homeLoss: {
      type: Number,
      default: 0
    },
    awayWin: {
      type: Number,
      default: 0
    },
    awayLoss: {
      type: Number,
      default: 0
    },
    goalDifference: {
      type: Number,
      default: 0
    },
    win: {
      type: Number,
      default: 0
    },
    loss: {
      type: Number,
      default: 0
    },
    draw: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 0
    },
    games: {
      type: Number,
      default: 0
    },
    goals: {
      type: Number,
      default: 0
    },
    conceded: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

TeamSchema.methods = {
  /**
   * Returns team object with only selected fields
   */
  transform() {
    // add feilds to be selected
    const fields = [
      'id',
      'name',
      'manager',
      'homeGround',
      'leaguePosition',
      'homeWin',
      'homeLoss',
      'awayWin',
      'awayLoss',
      'goalDifference',
      'win',
      'loss',
      'draw',
      'points',
      'goals',
      'conceded',
      'isDeleted'
    ];
    return pick(fields, this);
  },

  /**
   *
   * @param {req.body} obj
   * this method does the team update
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

TeamSchema.statics = {
  async getById(id) {
    try {
      /**
       * this ensures that the incoming id is
       * a valid mongoose id
       */
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError({
          message: 'No such team exist'
        });
      }
      const team = await this.findById(id).exec(); //returns user if found otherwise null
      if (team) {
        return team;
      }
      return team; //team will be null here
    } catch (error) {
      throw new APIError(error);
    }
  },

  async deleteOne(id) {
    const team = await this.findByIdAndRemove(id);
    return team;
  }
};

module.exports = mongoose.model('Team', TeamSchema);
