/* eslint-disable linebreak-style */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ User, Office }) {
      this.hasMany(User, { foreignKey: 'companyId' });
      this.hasMany(Office, { foreignKey: 'companyId' });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Company',
    },
  );
  return Company;
};
