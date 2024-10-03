'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proposals', {
      ProposalID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
        allowNull: false,
        type: Sequelize.ENUM('PROPOSAL', 'APPLICATION')
      },
      CompanyProfileLanguage: {
        allowNull: false,
        type: Sequelize.CHAR(2),
      },
      PDFFile: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      PPTXFile: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      ExpireDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      Version: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
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
      },
      DeletedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proposals');
  }
};