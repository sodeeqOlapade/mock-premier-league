const express = require('express');
const { celebrate: validate } = require('celebrate');
const adminCtrl = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/user.validation');
const APIError = require('../helpers/APIError');

router
  .route('/login')
  .post(validate(validation.loginUser, { abortEarly: false }), adminCtrl.login);

if (process.env.NODE_ENV !== 'test') {
  /**
   * developpment and production mode uses auth
   * testing mode doesn't
   */
  router.use(auth);

  router.use((req, res, next) => {
    if (!req.user.isAdmin) {
      throw new APIError({
        message: 'Authorization Denied!'
      });
    }
    next();
  });
}

// all routes under the auth middleware needs authentication
router
  .route('/signup')
  .post(
    validate(validation.createUser, { abortEarly: false }),
    adminCtrl.signup
  );

module.exports = router;
