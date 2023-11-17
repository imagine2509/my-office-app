/* eslint-disable linebreak-style */

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    static associate({ User, Room, Company }) {
      this.hasMany(User, { foreignKey: 'officeId' });
      this.hasMany(Room, { foreignKey: 'officeId' });
      this.belongsTo(Company, { foreignKey: 'companyId' });
    }
  }
  Office.init(
    {
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Office',
    },
  );
  return Office;
};
