const express = require('express');
const { celebrate: validate } = require('celebrate');
const adminCtrl = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/user.validation');

router
  .route('/login')
  .post(validate(validation.loginUser, { abortEarly: false }), adminCtrl.login);

router.use(auth);

// all routes under the auth middleware needs authentication
router
  .route('/signup')
  .post(
    validate(validation.createUser, { abortEarly: false }),
    adminCtrl.signup
  );

module.exports = router;
