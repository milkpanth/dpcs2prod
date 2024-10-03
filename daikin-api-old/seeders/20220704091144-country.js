'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('Countries', [{
      CountryID: 'TH',
      CountryName: 'Thailand'
    },{
      CountryID: 'SG',
      CountryName: 'Singapore'
    },{
      CountryID: 'VN',
      CountryName: 'Vietnam'
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Countries', null, {});
  }
};
