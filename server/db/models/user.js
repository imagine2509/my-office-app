'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Token }) {
      this.belongsToMany(Room, {
        through: 'UserRooms',
        foreignKey: 'userId',
      })
      this.hasOne(Token, {
        onDelete: 'cascade',
        foreignKey: 'userId',
        hooks: true,
      })
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      activationString: DataTypes.STRING,
      officeId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      birthDate: DataTypes.DATE,
      isAdmin: DataTypes.BOOLEAN,
      isActivated: DataTypes.BOOLEAN,
      isApproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
