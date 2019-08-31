const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

// router.get('/', (req, res, next) => {});

router.route('/login').post(userCtrl.login);

module.exports = router;
