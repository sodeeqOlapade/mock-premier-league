const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pick = require('ramda/src/pick');
const APIError = require('../helpers/APIError');
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
    awayWin: {
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

TeamSchema.methods = {};

TeamSchema.statics = {};

module.exports = mongoose.model('Team', TeamSchema);
