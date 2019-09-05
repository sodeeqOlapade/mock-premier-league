const express = require('express');
const { celebrate: validate } = require('celebrate');
const httpStatus = require('http-status');
const fixtureCtrl = require('../controllers/fixture.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/fixture.validation');
const APIError = require('../helpers/APIError');
/**
 * Authentication middleware
 */
router.use(auth);

/**
 * this middleware ensures only an admin gets
 * throught to the fixture route
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
 * preloads the fixture with the id supplied and
 * attaches it to req object
 */
router.param('id', fixtureCtrl.preLoad);

/**
 * route to GET all fixture
 * GET api/v1/fixture
 */
router.route('/').get(fixtureCtrl.getAll);

/**
 * route to GET single fixture
 * GET api/v1/fixture/:id
 */
router.route('/:id').get(fixtureCtrl.getSingle);

/**
 * route to create new fixture
 * POST api/v1/fixture
 */
router
  .route('/')
  .post(validate(validation.create, { abortEarly: false }), fixtureCtrl.create);

/**
 * route to delete single fixture
 * DELETE api/v1/fixture
 */
router.route('/:id').delete(fixtureCtrl.delete);

/**
 * route to update single fixture
 * PUT api/v1/fixture
 */
router
  .route('/:id')
  .put(validate(validation.update, { abortEarly: false }), fixtureCtrl.update);

module.exports = router;
