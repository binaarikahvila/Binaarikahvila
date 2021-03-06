var express = require('express');
var router = express.Router();
var tilausKaavake = require('../models/tilauskaavake.js');
var postiLahetys = require('../models/postivarmistus.js');

/* GET Tilauskaavake. */
router.get('/', function(req, res, next) {
  res.render('tilaus', {title: "Tilaus"} );
});

/* POST Tilauskaavake. */
router.post('/', function(req, res, next) {
	
	//Tilauksen luonnin päivämäärän haku DB:tä varten
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //Tammikuu on 0!
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    today = yyyy+"-"+mm+"-"+dd;
	
	//Tarkistaa, että sähköpostilähetys onnistui ja sitten vasta päivittää tietokannan
		
	postiLahetys.lahetaPosti(req.body);
	
	/*Tietokannan päivitys - mikäli samalla sähköpostilla, tapahtuman kuvauksella sekä
	tilauspäivämäärällä ja -ajalla on jo luotu tilaus, muokkaa sen tietoja.
	*/
	tilausKaavake.update(
		{ sposti: req.body.sahkoposti,				
		tapahtuma: req.body.tapahtuma,
		tilausPaiva: req.body.paiva,
		tilausTunti: req.body.alku,
		},
		{ pvm: today,
		nimi: req.body.nimi,
		puhelin: req.body.puhnro,
		maxOsallistuja: req.body.osallistujat,
		onkoTarjoilu: req.body.tarjoilu,		
		tilausKesto: req.body.kesto,
		kommentti: req.body.kommentti },
		{ upsert: true },		
		function(err) {
			if(err) {
				console.error(err.stack);
				return res.redirect(303, '/error');
			}
			return res.redirect(303, '/vahvistus');
			}		
	);	
});

module.exports = router;
