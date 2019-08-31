const express = require('express');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

// router.get('/', (req, res, next) => {});

router.route('/login').post(authCtrl.login);

module.exports = router;
