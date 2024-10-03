'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init({
    UserRoleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserMemberID: DataTypes.INTEGER,
    RoleID: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserRole',
  });
  return UserRole;
};