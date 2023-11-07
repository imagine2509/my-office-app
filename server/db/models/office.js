'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Office extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Room }) {
			this.hasMany(User, { foreignKey: 'officeId' });
			this.hasMany(Room, { foreignKey: 'officeId' });
		}
	}
	Office.init(
		{
			address: DataTypes.STRING,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Office',
		}
	);
	return Office;
};
