const connection = require('./sequelize');

const UrlsMeta = require('./models/Urls');
const UsersMeta = require('./models/Users');

module.exports.Urls = connection.define(
	'urls',
	UrlsMeta.attributes,
	UrlsMeta.options
);
module.exports.Users = connection.define(
	'users',
	UsersMeta.attributes,
	UsersMeta.options
);
