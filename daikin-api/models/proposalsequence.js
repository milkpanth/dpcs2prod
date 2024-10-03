'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProposalSequence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProposalSequence.init({
    TypeID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    Num: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ProposalSequence',
  });
  return ProposalSequence;
};