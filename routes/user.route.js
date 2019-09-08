const express = require('express');
const { celebrate: validate } = require('celebrate');
const userCtrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/user.validation');

router
  .route('/login')
  .post(validate(validation.loginUser, { abortEarly: false }), userCtrl.login);

router
  .route('/signup')
  .post(
    validate(validation.createUser, { abortEarly: false }),
    userCtrl.signup
  );

// all routes under the auth middleware needs authentication
router.use(auth);

module.exports = router;
