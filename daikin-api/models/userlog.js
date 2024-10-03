'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLog.belongsTo(models.UserMember, {foreignKey: 'UserMemberID'})
    }
  }
  UserLog.init({
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserMemberID: DataTypes.UUID,
    IPAddress: DataTypes.STRING,
    Function: DataTypes.STRING,
    Detail: DataTypes.STRING,
    CreatedDate: DataTypes.DATE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'UserLog',
  });
  return UserLog;
};