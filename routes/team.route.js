const express = require('express');
const { celebrate: validate } = require('celebrate');
const teamCtrl = require('../controllers/team.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();
const validation = require('../validations/team.validation');

router.use(auth);

router
  .route('/')
  .post(validate(validation.createTeam, { abortEarly: false }), teamCtrl.create);

module.exports = router;
