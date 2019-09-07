const express = require('express');
const httpStatus = require('http-status');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const teamRoutes = require('./team.route');
const fixtureRoutes = require('./fixture.route');
const teamCtrl = require('../controllers/team.controller');
const router = express.Router();
const response = require('../helpers/response');

//check API's sanity
router.get('/health-check', (req, res) =>
  res.json(response('Successful', 'OK', null, httpStatus.OK))
);

//mounting all routes

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/team', teamRoutes);
router.use('/fixture', fixtureRoutes);

//seach is a public route
router.route('/search').post(teamCtrl.search);

module.exports = router;
