const Sequelize = require('sequelize');
const { DB_URL, ADMIN_EMAIL, ADMIN_USER, ADMIN_PASS } = process.env;
const bcrypt = require('bcrypt');
const sequelize = new Sequelize(DB_URL, {
	logging: false,
	operatorsAliases: Sequelize.Op,
});

const UrlsMeta = require('./models/Urls');
const UserMeta = require('./models/Users');

const Urls = sequelize.define('urls', UrlsMeta.attributes, UrlsMeta.options);
const Users = sequelize.define('users', UserMeta.attributes, UserMeta.options);

// authenticate with the database
sequelize
	.authenticate()
	.then(async () => {
		// check if table exists, otherwise create it
		await Urls.sync();
		await Users.sync();

		if (process.env.INIT) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(ADMIN_PASS, salt);

			await Users.create({
				email: ADMIN_EMAIL,
				username: ADMIN_USER,
				password: hashedPassword,
			}).catch(err => null);
		}
	})
	.catch(err => {
		console.error('Unable to connect to the database: ', err); // eslint-disable-line
	});

module.exports = sequelize;
