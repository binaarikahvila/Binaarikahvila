var express = require('express');
var router = express.Router();

/* GET Yhteystiedot. */
router.get('/', function(req, res, next) {
  res.send('Yhteystiedot tähän');
});

module.exports = router;
