'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			this.belongsToMany(User, { through: 'UserRooms', foreignKey: 'roomId' });
		}
	}
	Room.init(
		{
			name: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			officeId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Room',
		}
	);
	return Room;
};
