var postitus = require('nodemailer');
var tunnukset = require('../credentials.js');

var postiLahetys = postitus.createTransport({
	service: 'Gmail',
	auth: {
		user: tunnukset.gmail.user,
		pass: tunnukset.gmail.password,
	},
	tls: { rejectUnauthorized: false },
});

exports.lahetaPosti = function(tiedot){
	var tarjoiluString = 'Ei';
	if (tiedot.tarjoilu){
		tarjoiluString = 'Kyllä';
	}
	
	postiLahetys.sendMail({
		from: 'binaarikahvila@gmail.com',
		to: tiedot.sahkoposti,
		encoding: 'utf-8',
		subject: 'Varauksesi Binäärikahvilaan on vastaanotettu',
		html: '<h1>Varauksesi on vastaanotettu</h1>\n<p>'+ tiedot.nimi + ', kiitokset ajanvarauksesta Kahvila Binäärin tiloissa! ' +
			'Ohessa tilauksenne tiedot:</p>' +
			'<p>Tapahtuma: ' + tiedot.tapahtuma+'</p>' +
			'<p>Päivä (KK/PP/VVVV): ' + tiedot.paiva + '</p>' +
			'<p>Alkaen: ' + tiedot.alku + ':00</p>' + 
			'<p>Kesto tunteina: ' + tiedot.kesto + '</p>' +
			'<p>Osallistujamäärä: ' + tiedot.osallistujat + '</p>' +
			'<p>Tarjoilu tilattu: ' + tarjoiluString + '</p>' +
			'\n<p><b>Odotamme innolla tuloanne!',
		generateTextFromHtml: true,		
	}, function(err){
		if (err) {
			console.error( 'Postitusvirhe: '+ err );
		}
	});
};