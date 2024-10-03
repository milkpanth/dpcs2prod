'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GenericLists', {
      GLID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProposalID: {
        type: Sequelize.STRING
      },
      GenericFileID: {
        type: Sequelize.INTEGER
      },
      GenericSubTypeID: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GenericLists');
  }
};