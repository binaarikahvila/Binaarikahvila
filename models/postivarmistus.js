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

exports.lahetaPosti = function(osoite){
	postiLahetys.sendMail({
		from: 'binaarikahvila@gmail.com',
		to: osoite,
		subject: 'Varauksesi Binäärikahvilaan on vastaanotettu',
		html: '<h1>Varauksesi on vastaanotettu</h1>\n<p>Kiitokset ajanvarauksesta Kahvila Binäärin tiloissa! ' +
			'Pyrimme tarkistamaan antamanne tiedot mahdollisimman nopeasti ja vahvistamaan ' +
			'tilauksenne. <b>Odotamme innolla tuloanne!</b>',
		generateTextFromHtml: true,		
	}, function(err){
		if (err) console.error( 'Postitusvirhe: '+ err );
	});
};