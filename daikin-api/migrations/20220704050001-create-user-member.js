'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserMembers', {
      UserMemberID: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      CompanyCode: {
        type: Sequelize.STRING,
        references: {
          model: 'CompanyProfiles',
          key: 'CompanyCode'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Position: {
        type: Sequelize.TEXT,
      },
      CountryID: {
        type: Sequelize.CHAR(2),
        references: {
          model: 'Countries',
          key: 'CountryID'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      UserMemberName: {
        type: Sequelize.STRING
      },
      UserMemberSurname: {
        type: Sequelize.STRING
      },
      UserMemberEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      UserMemberPhone: {
        type: Sequelize.STRING
      },
      UserMemberStatus: {
        type: Sequelize.BOOLEAN
      },
      AdminType: {
        type: Sequelize.ENUM("GLOBAL","LOCAL","ZONE_ASIA","ZONE_AFRICA","ZONE_EUROPE","ZONE_AMERICA","ZONE_ANTARCTICA","ZONE_AUSTRALIA"),
        allowNull: true
      },
      RecentLogin:{
        allowNull: true,
        type: Sequelize.DATE
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
      },
      DeletedDate:{
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserMembers');
  }
};