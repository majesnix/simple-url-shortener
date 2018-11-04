const Sequelize = require('sequelize');
const { DB_URL } = process.env;
const sequelize = new Sequelize(DB_URL, {
	logging: false,
	operatorsAliases: Sequelize.Op,
});

const UrlsMeta = require('./models/Urls');

const Urls = sequelize.define('urls', UrlsMeta.attributes, UrlsMeta.options);

// authenticate with the database
sequelize
	.authenticate()
	.then(async () => {
		// check if db exists, otherwise create it
		await Urls.sync();
	})
	.catch(err => {
		console.error('Unable to connect to the database: ', err); // eslint-disable-line
	});

module.exports = sequelize;
