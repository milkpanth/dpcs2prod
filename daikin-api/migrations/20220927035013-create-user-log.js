'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLogs', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserMemberID: {
        type: Sequelize.UUID
      },
      IPAddress: {
        type: Sequelize.STRING
      },
      Function: {
        type: Sequelize.STRING
      },
      Detail: {
        type: Sequelize.TEXT
      },
      CreatedDate: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserLogs');
  }
};