const dbconfig = {
  development: {
    username: "sa@mysql-dpcs2-stg-sea-001",
    password: "D@ik1n@123!!",
    database: "daikin_p2_db",
    host: "mysql-dpcs2-stg-sea-001.mysql.database.azure.com",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: false,
      },
    },
    define: {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      createdAt: "CreatedDate",
      updatedAt: "UpdatedDate",
      createdBy: "CreatedBy",
      updatedBy: "UpdatedBy",
      deletedAt: "DeletedDate",
    },
  },
  production: {
    username: "root",
    password: "123456",
    database: "daikin_db",
    host: "127.0.0.1",
    dialect: "mysql",
    /*"dialectOptions": {
      "ssl": {
        "require": false
      }
    },*/
    define: {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      createdAt: "CreatedDate",
      updatedAt: "UpdatedDate",
      createdBy: "CreatedBy",
      updatedBy: "UpdatedBy",
      deletedAt: "DeletedDate",
    },
  },
};

module.exports = dbconfig;
