const express = require('express');
const response = require('../helpers/response')

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.json(response('error', null, {msg:'errorrr..'}, 404));
  } catch (error) {
    next(error)
  }
});

module.exports = router;
