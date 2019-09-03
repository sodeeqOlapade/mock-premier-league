const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const teamRoutes = require('./team.route');
const fixtureRoutes = require('./fixture.route');

const router = express.Router();

//check API's sanity
router.get('/health-check', (req, res) => res.send('OK'));

//mounting all routes

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/team', teamRoutes);
router.use('/fixture', fixtureRoutes);

module.exports = router;
