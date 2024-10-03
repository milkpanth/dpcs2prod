'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Languages', {
      LangID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(2)
      },
      Name: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Languages');
  }
};