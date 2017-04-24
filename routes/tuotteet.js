var express = require('express');
var router = express.Router();

/* GET Tuotelistaus. */
router.get('/', function(req, res, next) {
  res.render('tuotteet', { title: 'Tuotteet' });
});

module.exports = router;
