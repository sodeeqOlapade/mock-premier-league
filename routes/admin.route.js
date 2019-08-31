const express = require('express');
const response = require('../helpers/response');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();

// router.get('/', (req, res, next) => {});

router.route('/login').post(adminCtrl.login);

module.exports = router;
