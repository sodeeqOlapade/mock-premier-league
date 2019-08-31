const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');

const router = express.Router(); 


//check API's sanity
router.get('/health-check', (req, res) => res.send('OK'));


//mounting all routes

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
