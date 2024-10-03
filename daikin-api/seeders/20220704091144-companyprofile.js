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
    const createdDate = new Date()
    await queryInterface.bulkInsert('CompanyProfiles', [{
      CompanyCode: "0000",
      Name: "DefaultCompany",
      CreatedDate: createdDate 
    },{
      CompanyCode: "INTTHA0001",
      Name: "Daikin Industries (Thailand) Ltd",
      CreatedDate: createdDate 
    },{
      CompanyCode: "INTSGP0001",
      Name: "Daikin Airconditioning (Singapore) Pte Ltd",
      CreatedDate: createdDate 
    },{
      CompanyCode: "INTVNM0001",
      Name: "Daikin Air Conditioning (Vietnam) Joint Stock Company",
      CreatedDate: createdDate 
    },{
      CompanyCode: "EXTTHA0001",
      Name: "EXT USER COMPANY TH",
      CreatedDate: createdDate 
    },{
      CompanyCode: "EXTVNM0001",
      Name: "EXT USER COMPANY VN",
      CreatedDate: createdDate 
    },{
      CompanyCode: "EXTSGP0001",
      Name: "EXT USER COMPANY SG",
      CreatedDate: createdDate 
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('CompanyProfiles', null, {});
  }
};
