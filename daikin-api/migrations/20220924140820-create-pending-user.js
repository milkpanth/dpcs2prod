'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PendingUsers', {
      PendingID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      givenName: {
        type: Sequelize.TEXT
      },
      surname: {
        type: Sequelize.TEXT
      },
      jobTitle: {
        type: Sequelize.TEXT
      },
      department: {
        type: Sequelize.TEXT
      },
      usageLocation: {
        type: Sequelize.STRING
      },
      CompanyName: {
        type: Sequelize.TEXT
      },
      CompanyCode: {
        type: Sequelize.STRING
      },
      streetAddress: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      postalCode: {
        type: Sequelize.TEXT
      },
      mobile: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED')
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      CreatedDate: {
        type: Sequelize.DATE
      },
      ApprovedBy: {
        type: Sequelize.STRING
      },
      ApprovedDate: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PendingUsers');
  }
};