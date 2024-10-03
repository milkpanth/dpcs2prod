"use strict";

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
    const createdDate = new Date()
    await queryInterface.bulkInsert("UserMembers", [
      {
        UserMemberID: "97d5245b-30d7-423b-aadb-715f554437e8",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Motomi",
        UserMemberSurname: "Fukui",
        UserMemberEmail: "motomi@mfec.co.th",
        UserMemberPhone: "012345678",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "377e78d8-4c3e-41c3-a0dc-5aed27f90a84",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Tasanai",
        UserMemberSurname: "Eamsa-ard",
        UserMemberEmail: "tasanai@mfec.co.th",
        UserMemberPhone: "012345678",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Chonlamad",
        UserMemberSurname: "Sungsorn",
        UserMemberEmail: "chonlamad@niche-est.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Kamonwan",
        UserMemberSurname: "Arin",
        UserMemberEmail: "kamonwan@niche-est.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Sanhanut",
        UserMemberSurname: "Mitrdee",
        UserMemberEmail: "sanhanut@niche-est.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        CompanyCode: "INTTHA0001",
        CountryID: "TH",
        UserMemberName: "Yongping",
        UserMemberSurname: "Tan",
        UserMemberEmail: "yongping.tan@dit.daikin.co.jp",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "aec95392-e6e8-4600-b88d-4aefbd30cb96",
        CompanyCode: "INTSGP0001",
        CountryID: "SG",
        UserMemberName: "Yongping",
        UserMemberSurname: "Tan",
        UserMemberEmail: "yongping.tan@daikin.com.sg",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        CompanyCode: "INTTHA0001",
        CountryID: "TH",
        UserMemberName: "Attaporn",
        UserMemberSurname: "Utta",
        UserMemberEmail: "attaporn@dit.daikin.co.jp",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        CompanyCode: "INTTHA0001",
        CountryID: "TH",
        UserMemberName: "Chonlakamon",
        UserMemberSurname: "Suksawat",
        UserMemberEmail: "chonlakamon@dit.daikin.co.jp",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "73404e2d-c8de-43b0-a2ae-8bb3219e2ae8",
        CompanyCode: "INTTHA0001",
        CountryID: "TH",
        UserMemberName: "Kouhei",
        UserMemberSurname: "Shibata",
        UserMemberEmail: "kouhei.shibata@daikin.co.jp",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "fc611761-c5d1-46c9-a24d-dc810030092d",
        CompanyCode: "INTTHA0001",
        CountryID: "TH",
        UserMemberName: "Norapat",
        UserMemberSurname: "Bunyasirkul",
        UserMemberEmail: "norapat@dit.daikin.co.jp",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "cfc2724c-70ad-49d4-966a-23ca60e0a0e5",
        CompanyCode: "EXTTHA0001",
        CountryID: "SG",
        UserMemberName: "Yongping",
        UserMemberSurname: "External",
        UserMemberEmail: "tan.yong.ping@hotmail.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "4d529388-181b-4bed-b09d-9a8941abca6f",
        CompanyCode: "EXTVNM0001",
        CountryID: "VN",
        UserMemberName: "Simul1",
        UserMemberSurname: "External",
        UserMemberEmail: "aots.dspg.2022@gmail.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "66ae20bc-a6c9-467a-8ad2-0060b0a7fe61",
        CompanyCode: "EXTSGP0001",
        CountryID: "SG",
        UserMemberName: "Simul2",
        UserMemberSurname: "External",
        UserMemberEmail: "dsp.edd.regional@gmail.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        CompanyCode: "0000",
        CountryID: "TH",
        UserMemberName: "Phacharapol",
        UserMemberSurname: "Phumsakul",
        UserMemberEmail: "phacharapol@niche-est.com",
        UserMemberStatus: true,
        CreatedDate: createdDate 
      }
    ]);

    await queryInterface.bulkInsert("UserRoles", [
      {
        UserMemberID: "377e78d8-4c3e-41c3-a0dc-5aed27f90a84",
        RoleID: 1,
      },
      {
        UserMemberID: "377e78d8-4c3e-41c3-a0dc-5aed27f90a84",
        RoleID: 2,
      },
      {
        UserMemberID: "97d5245b-30d7-423b-aadb-715f554437e8",
        RoleID: 3,
      },
      // sanhanut@niche-est.com
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        RoleID: 1,
      },
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        RoleID: 2,
      },
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        RoleID: 3,
      },
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        RoleID: 4,
      },
      {
        UserMemberID: "4b20db7d-cc2d-489e-8991-248493e7deb4",
        RoleID: 5,
      },
      //
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        RoleID: 1,
      },
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        RoleID: 2,
      },
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        RoleID: 3,
      },
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        RoleID: 4,
      },
      {
        UserMemberID: "09213ebd-24f3-458b-8f54-5c0e05fbb45c",
        RoleID: 5,
      },
      // yongping.tan@dit.daikin.co.jp
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        RoleID: 1,
      },
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        RoleID: 2,
      },
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        RoleID: 3,
      },
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        RoleID: 4,
      },
      {
        UserMemberID: "04c7f626-fbbd-4d6b-97f0-41bc52ee37d6",
        RoleID: 5,
      },
      // yongping.tan@daikin.com.sg
      {
        UserMemberID: "aec95392-e6e8-4600-b88d-4aefbd30cb96",
        RoleID: 2,
      },
      {
        UserMemberID: "aec95392-e6e8-4600-b88d-4aefbd30cb96",
        RoleID: 3,
      },
      {
        UserMemberID: "aec95392-e6e8-4600-b88d-4aefbd30cb96",
        RoleID: 5,
      },
      // attaporn@dit.daikin.co.jp
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        RoleID: 1,
      },
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        RoleID: 2,
      },
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        RoleID: 3,
      },
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        RoleID: 4,
      },
      {
        UserMemberID: "86961cd5-7140-46dd-ac47-0ae083c1034b",
        RoleID: 5,
      },
      // chonlakamon@dit.daikin.co.jp
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        RoleID: 1,
      },
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        RoleID: 2,
      },
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        RoleID: 3,
      },
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        RoleID: 4,
      },
      {
        UserMemberID: "abfda4c0-6dbe-4f8b-9e8d-e7d36f70ba4d",
        RoleID: 5,
      },
      // kouhei.shibata@daikin.co.jp
      {
        UserMemberID: "73404e2d-c8de-43b0-a2ae-8bb3219e2ae8",
        RoleID: 2,
      },
      {
        UserMemberID: "73404e2d-c8de-43b0-a2ae-8bb3219e2ae8",
        RoleID: 3,
      },
      {
        UserMemberID: "73404e2d-c8de-43b0-a2ae-8bb3219e2ae8",
        RoleID: 4,
      },
      // norapat@dit.daikin.co.jp
      {
        UserMemberID: "fc611761-c5d1-46c9-a24d-dc810030092d",
        RoleID: 6,
      },
      // tan.yong.ping@hotmail.com
      {
        UserMemberID: "cfc2724c-70ad-49d4-966a-23ca60e0a0e5",
        RoleID: 7,
      },
      // aots.dspg.2022@gmail.com
      {
        UserMemberID: "4d529388-181b-4bed-b09d-9a8941abca6f",
        RoleID: 7,
      },
      // dsp.edd.regional@gmail.com
      {
        UserMemberID: "66ae20bc-a6c9-467a-8ad2-0060b0a7fe61",
        RoleID: 7,
      },
      // chonlamad@niche-est.com
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        RoleID: 1,
      },
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        RoleID: 2,
      },
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        RoleID: 3,
      },
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        RoleID: 4,
      },
      {
        UserMemberID: "8b4a7aac-8307-4830-bb0c-3864947dea85",
        RoleID: 5,
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        RoleID: 1,
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        RoleID: 2,
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        RoleID: 3,
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        RoleID: 4,
      },
      {
        UserMemberID: "08cad15f-8ddc-4cc6-b3eb-047889d01cd1",
        RoleID: 5,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserRoles", null, {});
    await queryInterface.bulkDelete("UserMembers", null, {});
  },
};
