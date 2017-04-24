var express = require('express');
var router = express.Router();

/* GET Tilauskaavake. */
router.get('/', function(req, res, next) {
  res.render('tilaus', { title: 'Tilaukset' });
});

module.exports = router;
