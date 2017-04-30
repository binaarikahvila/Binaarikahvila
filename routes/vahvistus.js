var express = require('express');
var router = express.Router();

/* GET Tilausvahvistus. */
router.get('/', function(req, res, next) {
  res.render('vahvistus', {title: "Tilausvahvistus"} );
});

module.exports = router;