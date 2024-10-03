'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Series.hasMany(models.SeriesFile, { foreignKey: 'SeriesID', onDelete:'CASCADE', onUpdate:'CASCADE' })
      Series.belongsTo(models.Model, { foreignKey: 'SeriesID' })
    }
  }
  Series.init({
    SeriesID: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    ImagePath: DataTypes.TEXT,
    ClassID: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Series',
  });
  return Series;
};