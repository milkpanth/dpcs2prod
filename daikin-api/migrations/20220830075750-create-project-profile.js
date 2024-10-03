'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectProfiles', {
      CompanyCode: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectName: {
        type: Sequelize.TEXT
      },
      CustomerName: {
        type: Sequelize.TEXT
      },
      ProjectAddress: {
        type: Sequelize.TEXT
      },
      Type: {
        type: Sequelize.ENUM('PROJECT', 'GENERIC')
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UpdatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectProfiles');
  }
};