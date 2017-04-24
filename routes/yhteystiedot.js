var express = require('express');
var router = express.Router();

/* GET Yhteystiedot. */
router.get('/', function(req, res, next) {
  res.render('yhteystiedot', { title: 'Yhteystiedot' });
});

module.exports = router;
