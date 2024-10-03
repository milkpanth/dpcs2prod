'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectSectionLists', {
      PSLID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProposalID: {
        type: Sequelize.STRING
      },
      SectionArrayText: {
        type: Sequelize.TEXT
      },
      SubSectionArrayText: {
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectSectionLists');
  }
};