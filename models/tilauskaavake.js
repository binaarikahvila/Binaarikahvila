var mongoose = require('mongoose');

var tilausKaavakeSkeema = mongoose.Schema({
	nimi: String,
	sposti: String,
	puhelin: String,
	tapahtuma: String,
	maxOsallistuja: Number,
	onkoTarjoilu: Boolean,
	kommentti: String,
});

var TilausKaavake = mongoose.model('TilausKaavake', tilausKaavakeSkeema);

module.exports = TilausKaavake;