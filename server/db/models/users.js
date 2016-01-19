'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		username: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		phoneNumber: {
			type: Sequelize.STRING,
			validate: {
				len: [10,13]
			}
		},
		photo: {
			type: DataTypes.STRING
		},
		github: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING
		},
		karmaPoints: {
			type: DataTypes.INTEGER
		}
	});
};
