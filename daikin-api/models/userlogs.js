'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLogs.belongsTo(models.UserMember, {foreignKey: 'UserMemberID'})
    }
  }
  UserLogs.init({
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserMemberID: DataTypes.STRING,
    IPAddress: DataTypes.STRING,
    Function: DataTypes.STRING,
    Detail: DataTypes.STRING,
    CreatedDate: DataTypes.DATE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'UserLogs',
  });
  return UserLogs;
};