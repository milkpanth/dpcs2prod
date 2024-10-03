'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Positions', {
      PositionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      PositionName: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UpdatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Positions');
  }
};