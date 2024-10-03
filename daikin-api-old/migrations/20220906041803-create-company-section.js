'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanySections', {
      CSID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SectionID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sections',
          key: 'SectionID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      CompanyOrder: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      CompanyCode: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('CompanySections');
  }
};