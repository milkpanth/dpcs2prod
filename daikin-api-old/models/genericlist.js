'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenericList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GenericList.belongsTo(models.GenericFile, {foreignKey: 'GenericFileID'})
      GenericList.belongsTo(models.GenericSubType, {foreignKey: 'GenericSubTypeID'})
    }
  }
  GenericList.init({
    GLID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ProposalID: DataTypes.STRING,
    //GenericFileID: DataTypes.INTEGER
    //GenericSubTypeID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'GenericList',
  });
  return GenericList;
};