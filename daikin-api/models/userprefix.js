'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPrefix extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPrefix.init({
    PrefixID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserPrefixName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPrefix',
    timestamps: false,
  });
  return UserPrefix;
};