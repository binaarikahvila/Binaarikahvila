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

var tilausKaavake = mongoose.model('tilausKaavake', tilausKaavakeSkeema);

module.exports = tilausKaavake;