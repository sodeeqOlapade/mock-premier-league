const express = require('express');
const adminCtrl = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.route('/login').post(adminCtrl.login);

router.use(auth);

router.route('/signup').post(adminCtrl.login);

module.exports = router;
