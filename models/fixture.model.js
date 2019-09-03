const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const pick = require('ramda/src/pick');
const APIError = require('../helpers/APIError');
const response = require('../helpers/response');
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
      refs: 'Team'
    },
    isDraw: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['not-started', 'live', 'finished', 'postponed'],
      default: 'not-started'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

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
