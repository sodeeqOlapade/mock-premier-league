const express = require('express');
const { celebrate: validate } = require('celebrate');
const httpStatus = require('http-status');
const teamCtrl = require('../controllers/team.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/team.validation');
const APIError = require('../helpers/APIError');
/**
 * Authentication middleware
 */
router.use(auth);

/**
 * this middleware ensures only an admin gets
 * throught to the team route
 */
router.use((req, res, next) => {
  if (!req.user.isAdmin) {
    throw new APIError({
      message: 'Authorization Denied!'
    });
  }
  next();
});

/**
 * preloads the team with the id supplied and
 * attaches it to req object
 */
router.param('id', teamCtrl.preLoad);

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

/**
 * route to delete single team
 * DELETE api/v1/team
 */
router.route('/:id').delete(teamCtrl.delete);
module.exports = router;
