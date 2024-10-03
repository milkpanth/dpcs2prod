'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GenericSubTypes', {
      GenericSubTypeID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GenericID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Generics',
          key: 'GenericID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Name: {
        type: Sequelize.STRING
      },
      Detail: {
        type: Sequelize.TEXT('medium')
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
    await queryInterface.dropTable('GenericSubTypes');
  }
};