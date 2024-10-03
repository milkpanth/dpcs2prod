'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Generic.hasMany(models.GenericSubType, { foreignKey: 'GenericID', onDelete:'CASCADE', onUpdate:'CASCADE' })
    }
  }
  Generic.init({
    GenericID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    Detail: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Generic',
  });
  return Generic;
};