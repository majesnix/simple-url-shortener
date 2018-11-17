const Sequelize = require('sequelize');

module.exports.attributes = {
	email: {
		type: Sequelize.STRING,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		defaultValue: '',
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
};

module.exports.options = {
	freezeTableName: true
};