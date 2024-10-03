'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PendingProposals', {
      ID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ProposalData: {
        type: Sequelize.JSON
      },
      SectionList: {
        type: Sequelize.JSON
      },
      EquipList: {
        type: Sequelize.JSON
      },
      CreatedDate: {
        type: Sequelize.DATE
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.ENUM("PENDING", "WORKING", "SUCCESS", "ERROR"),
        defaultValue: "PENDING",
      },
      StatusDetail: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PendingProposals');
  }
};