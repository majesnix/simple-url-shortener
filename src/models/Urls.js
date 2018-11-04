const Sequelize = require('sequelize');

module.exports.attributes = {
	short_url: {
		type: Sequelize.STRING
	},
	long_url: {
		type: Sequelize.STRING
	}
};

module.exports.options = {
	freezeTableName: true,
};
