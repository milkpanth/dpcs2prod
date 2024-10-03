'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PendingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PendingUser.belongsTo(models.UserMember, { targetKey: 'UserMemberID', foreignKey: 'CreatedBy' })
    }
  }
  PendingUser.init({
    PendingID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    givenName: DataTypes.STRING,
    surname: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    department: DataTypes.STRING,

    usageLocation: DataTypes.STRING,

    CompanyName: DataTypes.STRING,
    CompanyCode: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    mobile: DataTypes.STRING,
    status: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    ApprovedBy: DataTypes.STRING,
    ApprovedDate: DataTypes.DATE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'PendingUser',
  });
  return PendingUser;
};