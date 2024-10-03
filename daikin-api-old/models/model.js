'use strict';
const SequelizeModel = require('sequelize').Model;
module.exports = (sequelize, DataTypes) => {
  class Model extends SequelizeModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Model.hasMany(models.ModelFile, { foreignKey: 'ModelID', onDelete:'CASCADE', onUpdate:'CASCADE' })
      //Model.hasMany(models.Series, { foreignKey: 'SeriesID', onDelete:'CASCADE', onUpdate:'CASCADE' })
    }
  }
  Model.init({
    ModelID: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    ClassID: DataTypes.STRING,
    SeriesID: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Model',
  });
  return Model;
};