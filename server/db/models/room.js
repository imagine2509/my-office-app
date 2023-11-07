'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User , Office }) {
			this.belongsToMany(User, { through: 'UserRooms', foreignKey: 'roomId' });
			this.belongsTo(Office, { foreignKey: 'officeId', });
		}
	}
	Room.init(
		{
			name: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			officeId: DataTypes.INTEGER,
			video: DataTypes.BOOLEAN,
			description: DataTypes.STRING,
			photo: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Room',
		}
	);
	return Room;
};
