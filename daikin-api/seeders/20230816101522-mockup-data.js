"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("series", [
      {
        SeriesID: "FXFSQ-A",
        ClassID: "ODU_VRV",
      },
      {
        SeriesID: "VRV 7W",
        ClassID: "ODU_VRV",
      },
      {
        SeriesID: "VRV A",
        ClassID: "IDU_VRV",
      },
    ]);
    await queryInterface.bulkInsert("models", [
      {
        ModelID: "FXFSQ50AVM",
        ClassID: "IDU_VRV",
        SeriesID: "FXFSQ-A",
      },
      {
        ModelID: "RWEYQ60BYM",
        ClassID: "ODU_VRV",
        SeriesID: "VRV 7W",
      },
      {
        ModelID: "RXQ16AMYM",
        ClassID: "ODU_VRV",
        SeriesID: "VRV A",
      },
    ]);
    await queryInterface.bulkInsert("modelfiles", [
      {
        ModelID: "RWEYQ60BYM",
        Path: "fakepath/RWEYQ60BYM_GLOBAL_EN.pptx",
        LangID: "en",
        CompanyCode: null,
      },
      {
        ModelID: "RWEYQ60BYM",
        Path: "fakepath/RWEYQ60BYM_GLOBAL_TH.pptx",
        LangID: "th",
        CompanyCode: null,
      },
      {
        ModelID: "RWEYQ60BYM",
        Path: "fakepath/RWEYQ60BYM_LOCAL_EN.pptx",
        LangID: "en",
        CompanyCode: "0000",
      },
      {
        ModelID: "RWEYQ60BYM",
        Path: "fakepath/RWEYQ60BYM_LOCAL_TH.pptx",
        LangID: "th",
        CompanyCode: "0000",
      },
      {
        ModelID: "RXQ16AMYM",
        Path: "fakepath/RWEYQ60BYM_GLOBAL_TH.pptx",
        LangID: "th",
        CompanyCode: null,
      },
      {
        ModelID: "RXQ16AMYM",
        Path: "fakepath/RWEYQ60BYM_LOCAL_TH.pptx",
        LangID: "th",
        CompanyCode: "0000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("series", null, {});
    await queryInterface.bulkDelete("models", null, {});
    await queryInterface.bulkDelete("modelfiles", null, {});
  },
};
