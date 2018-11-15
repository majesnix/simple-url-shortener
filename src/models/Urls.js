const Sequelize = require('sequelize');

module.exports.attributes = {
	short_url: {
		type: Sequelize.STRING,
		field: 'short_url',
	},
	long_url: {
		type: Sequelize.STRING,
		field: 'long_url',
	},
};

module.exports.options = {
	freezeTableName: true,
};
