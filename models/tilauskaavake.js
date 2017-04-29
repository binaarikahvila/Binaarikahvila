var mongoose = require('mongoose');

var tilausKaavakeSkeema = mongoose.Schema({
	pvm: String,
	nimi: String,
	sposti: String,
	puhelin: String,
	tapahtuma: String,
	maxOsallistuja: Number,
	onkoTarjoilu: Boolean,
	tilausPaiva: Date,
	tilausTunti: Number,
	tilausKesto: Number,
	kommentti: String,
});

var TilausKaavake = mongoose.model('TilausKaavake', tilausKaavakeSkeema);

module.exports = TilausKaavake;