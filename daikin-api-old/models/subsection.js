'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubSection.belongsTo(models.Section, {foreignKey: 'SectionID'})
    }
  }
  SubSection.init({
    SubID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    Active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubSection',
  });
  return SubSection;
};