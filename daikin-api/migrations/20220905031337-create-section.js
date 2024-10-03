'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sections', {
      SectionID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      LangID: {
        allowNull: false,
        type: Sequelize.CHAR(2),
        references: {
          model: 'Languages',
          key: 'LangID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      SubDetail: {
        allowNull: true,
        type: Sequelize.ENUM("Series", "Model", "Unique")
      },
      Company: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sections');
  }
};