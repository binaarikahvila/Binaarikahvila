var express = require('express');
var router = express.Router();

/* GET Tuotelistaus. */
router.get('/', function(req, res, next) {
  res.send('Tuotteet tähän');
});

module.exports = router;
