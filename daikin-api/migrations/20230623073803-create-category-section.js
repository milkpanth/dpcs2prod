'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategorySections', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CategoryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'CategoryID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      SectionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sections',
          key: 'SectionID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CategorySections');
  }
};