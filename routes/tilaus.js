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
	
	//Päivämäärän haku DB:tä varten
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //Tammikuu on 0!
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    today = yyyy+""+mm+""+dd;
	
	tilausKaavake.update(
		{ sposti: req.body.sahkoposti,				
		tapahtuma: req.body.tapahtuma,
		pvm: today,
		},
		{ nimi: req.body.nimi,
		puhelin: req.body.puhnro,
		maxOsallistuja: req.body.osallistujat,
		onkoTarjoilu: req.body.tarjoilu,
		kommentti: req.body.kommentti },
		{ upsert: true },		
		function(err) {
			if(err) {
				console.error(err.stack);
				return res.redirect(303, '/tuotteet');
			}
			return res.redirect(303, '/tilaus');
		}
	);
});

module.exports = router;
