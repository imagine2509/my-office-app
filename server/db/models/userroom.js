'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserRoom extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Room }) {
			this.belongsTo(User);
			this.belongsTo(Room);
		}
	}
	UserRoom.init(
		{
			startTime: DataTypes.DATE,
			endTime: DataTypes.DATE,
			userId: DataTypes.INTEGER,
			roomId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'UserRoom',
		}
	);
	return UserRoom;
};
