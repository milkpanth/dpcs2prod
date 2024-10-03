'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenericSubType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GenericSubType.hasMany(models.GenericFile, { foreignKey: 'GenericSubTypeID', onDelete:'CASCADE', onUpdate:'CASCADE' })
      GenericSubType.belongsTo(models.Generic, { foreignKey: 'GenericID' })
    }
  }
  GenericSubType.init({
    GenericSubTypeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    Detail: DataTypes.TEXT('medium'),
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GenericSubType',
  });
  return GenericSubType;
};