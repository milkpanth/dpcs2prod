'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SectionSlides', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      SlideID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Slides',
          key: 'SlideID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SectionSlides');
  }
};