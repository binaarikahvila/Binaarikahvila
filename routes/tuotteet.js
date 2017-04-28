var express = require('express');
var router = express.Router();

//Tuotelistauksen tarkistus ja alustaminen
var Tuote = require('../models/tuotelista.js');

Tuote.find(function(err, tuotes){
	//Heittää virheen konsolille, jos sellainen tapahtuu
	if (err) return console.error(err);
	//Mikäli tietokannassa edes jotain, palauttaa tiedot
	if (tuotes.length) return;
	//Mikäli tyhjä tietokanta, alustaa sen seuraavilla tiedoilla
	
	new Tuote({
		nimi: 'Kahvi',
		luokka: 'Juoma',
		hintaSentit: 200,
		kuvaus: 'Kuuma kuppi parhainta tummaa kahvia!',
		onGluteeniton: true,
		onLaktoositon: true,
	}).save();
	
	new Tuote({
		nimi: 'Tee',
		luokka: 'Juoma',
		hintaSentit: 200,
		kuvaus: 'Kuppi maistuvinta teetä!',
		onGluteeniton: true,
		onLaktoositon: true,
	}).save();
	
	new Tuote({
		nimi: 'Korvapuusti',
		luokka: 'Leivonnainen',
		hintaSentit: 495,
		kuvaus: 'Oikein kanelinen ja maistuva leivos kahvin tai teen kaveriksi!',
		onGluteeniton: false,
		onLaktoositon: true,
	}).save();
	
	new Tuote({
		nimi: 'Suklaakakku',
		luokka: 'Leivonnainen',
		hintaSentit: 595,
		kuvaus: 'Suklaantäytteinen maukas pala kakkua parhaimpiin päiviin!',
		onGluteeniton: false,
		onLaktoositon: false,
	}).save();	
})


/* GET Tuotelistaus. */
router.get('/', function(req, res, next) {
	Tuote.find({}, function(err, tuote) {
		var context = {
			tuote: tuote.map(function(tuote) {
				return {					
					nimi: tuote.nimi,
					kuvaus: tuote.kuvaus,
					hinta: tuote.getEuroHinta(),
					onLaktoositon: tuote.onLaktoositon,
					onGluteeniton: tuote.onGluteeniton,
				}
			})
		};		
		console.log(context.tuote);
		res.render('tuotteet', {title: 'Tuotteet', context: context});	
	});	
});

module.exports = router;
