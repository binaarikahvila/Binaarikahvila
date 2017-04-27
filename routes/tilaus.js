var express = require('express');
var router = express.Router();
var tilausKaavake = require('../models/tilauskaavake.js');

/* GET Tilauskaavake. */
router.get('/', function(req, res, next) {
  res.render('tilaus');
});

/* POST Tilauskaavake. */
router.post('/', function(req, res, next) {
	console.log('Napataan tietoja....');
	tilausKaavake.update(
		{ nimi: req.body.nimi },
		{ sposti: req.body.sahkoposti },
		{ puhelin: req.body.puhnro },
		{ tapahtuma: req.body.tapahtuma },
		{ upsert: true },		
		function(err) {
			if(err) {
				console.error(err.stack);
				return res.redirect(303, '/');
			}
			return res.redirect(303, '/');
		}
	);
	console.log('Tiedot tallennettu!');
});

module.exports = router;
