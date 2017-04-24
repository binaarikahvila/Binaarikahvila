var express = require('express');
var router = express.Router();

/* GET Tilauskaavake. */
router.get('/', function(req, res, next) {
  res.send('Tilaus tähän');
});

module.exports = router;
