var mongoose = require('mongoose');

var tuoteSkeema = mongoose.Schema({
	nimi: String,
	luokka: String,
	hintaSentit: Number,
	kuvaus: String,
	onGluteeniton: Boolean,
	onLaktoositon: Boolean,
});

tuoteSkeema.methods.getEuroHinta = function(){
	return (this.hintaSentit / 100).toFixed(2) + '€';
};

var Tuote = mongoose.model('Tuote', tuoteSkeema);
module.exports = Tuote;