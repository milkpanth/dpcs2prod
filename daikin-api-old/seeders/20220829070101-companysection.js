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
    const createdTime = new Date()
     await queryInterface.bulkInsert("CompanySections", [
      {
        CSID: 1,
        CompanyOrder: 1,
        SectionID: 1,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 2,
        CompanyOrder: 2,
        SectionID: 2,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 3,
        CompanyOrder: 3,
        SectionID: 3,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 4,
        CompanyOrder: 4,
        SectionID: 4,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 5,
        CompanyOrder: 5,
        SectionID: 5,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 6,
        CompanyOrder: 6,
        SectionID: 6,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 7,
        CompanyOrder: 7,
        SectionID: 7,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 8,
        CompanyOrder: 8,
        SectionID: 8,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 9,
        CompanyOrder: 9,
        SectionID: 9,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      },
      {
        CSID: 10,
        SectionID: 10,
        CompanyOrder: 10,
        CompanyCode: "0000",
        CreatedDate: createdTime,
        UpdatedDate: createdTime
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("CompanySections", null, {});
  }
};
