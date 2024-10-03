const dbconfig = {
  "development": {
    "username": "sa@mysql-dpcs-dev-sea-001",
    "password": "D@ik1n@123!!",
    "database": "daikin_db",
    "host": "mysql-dpcs-dev-sea-001.mysql.database.azure.com",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "require": true
      }
    },
    "define": {
      "charset": "utf8",
      "collate": "utf8_unicode_ci",
      "createdAt": "CreatedDate",
      "updatedAt": "UpdatedDate",
      "createdBy": "CreatedBy",
      "updatedBy": "UpdatedBy",
      "deletedAt": "DeletedDate"
    }
  },
  "production": {
    "username": "sa@mysql-dpcs-prd-sea-002",
    "password": "D@ik1n@123!!",
    "database": "daikin_db",
    "host": "mysql-dpcs-prd-sea-002.mysql.database.azure.com",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "require": true
      }
    },
    "define": {
      "charset": "utf8",
      "collate": "utf8_unicode_ci",
      "createdAt": "CreatedDate",
      "updatedAt": "UpdatedDate",
      "createdBy": "CreatedBy",
      "updatedBy": "UpdatedBy",
      "deletedAt": "DeletedDate"
    }
  }
}

module.exports = dbconfig
