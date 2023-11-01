'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Room }) {
			this.belongsToMany(Room, {
				through: 'UserRooms',
				foreignKey: 'userId',
			});
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			officeId: DataTypes.INTEGER,
			birthDate: DataTypes.DATE,
			isAdmin: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
