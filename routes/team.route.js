const express = require('express');
const { celebrate: validate } = require('celebrate');
const teamCtrl = require('../controllers/team.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/team.validation');

/**
 * preloads the team with the id supplied and
 * attaches it to req object
 */
router.param('id', teamCtrl.preLoad);

/**
 * Authentication middleware
 */
router.use(auth);

/**
 * route to GET all teams
 * GET api/v1/team
 */
router.route('/').get(teamCtrl.getAllTeam);

/**
 * route to GET single team
 * GET api/v1/team/:id
 */
router.route('/:id').get(teamCtrl.getSingleTeam);

/**
 * route to create new team
 * POST api/v1/team
 */
router
  .route('/')
  .post(
    validate(validation.createTeam, { abortEarly: false }),
    teamCtrl.create
  );

module.exports = router;
