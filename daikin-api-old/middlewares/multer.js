require("dotenv").config();
const multer = require("multer")
const { MulterAzureStorage} = require("multer-azure-blob-storage")
const { TEST } = require("../constants/container")
const { TEMP_OUTPUT } = require("../helpers/powerpoint")
const { errorJson } = require("../helpers/error")

const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
      const blobName = "testExcel.xlsx"//yourCustomLogic(req, file);
      resolve(blobName);
  });
};

const resolveMetadata = (req, file) => {
  return new Promise((resolve, reject) => {
      const metadata = yourCustomLogic(req, file);
      resolve(metadata);
  });
};

const resolveContentSettings = (req, file) => {
  return new Promise((resolve, reject) => {
      const contentSettings = yourCustomLogic(req, file);
      resolve(contentSettings);
  });
};

const azureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  containerName: TEST,
  /*blobName: resolveBlobName,
  metadata: resolveMetadata,
  contentSettings: resolveContentSettings,*/
  containerAccessLevel: 'blob'
})

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_OUTPUT)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})

const uploadExcelFile = (req, res, next) => {
  multer({
    storage: azureStorage,
    limits: { fileSize: 10 * 1000 * 1000 }, //MB, KB
    fileFilter: (req, file, cb) => {
        const allowList = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/octet-stream"
        ]
        if (isFileTypeAllow(file.mimetype, allowList)) {
            return cb(null, true)
        }
        return cb(Error(`Wrong file type! allow ${allowList.join(",")} but recieved ${file.mimetype}.`))
    }
  }).single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).json(errorJson(err))
      }
      next()
  })
}

const uploadPowerPointFileLocal = (req, res, next) => {
  multer({
    storage: localStorage,
    limits: { fileSize: 50 * 1000 * 1000 }, //MB, KB
    fileFilter: (req, file, cb) => {
        const allowList = [
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/octet-stream"
        ]
        if (isFileTypeAllow(file.mimetype, allowList)) {
            return cb(null, true)
        }
        return cb(Error(`Wrong file type! allow ${allowList.join(",")} but recieved ${file.mimetype}.`))
    }
  }).single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).json(errorJson(err))
      }
      next()
  })
}

const uploadPowerPointFile = (req, res, next) => {
  multer({
    storage: azureStorage,
    limits: { fileSize: 50 * 1000 * 1000 }, //MB, KB
    fileFilter: (req, file, cb) => {
        const allowList = [
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/octet-stream"
        ]
        if (isFileTypeAllow(file.mimetype, allowList)) {
            return cb(null, true)
        }
        return cb(Error(`Wrong file type! allow ${allowList.join(",")} but recieved ${file.mimetype}.`))
    }
  }).single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).json(errorJson(err))
      }
      next()
  })
}

/*
const uploadImageFile = (req, res, next) => {
  multer({
    storage: azureStorage,
    limits: { fileSize: 2048 * 1000 * 1000 }, //KB
    fileFilter: (req, file, cb) => {
        const allowList = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]
        if (isFileTypeAllow(file.mimetype, allowList)) {
            return cb(null, true)
        }
        return cb(Error(`Wrong file type! allow ${allowList.join(",")} but recieved ${file.mimetype}.`))
    }
  }).single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).json(errorJson(err))
      }
      next()
  })
}*/

function isFileTypeAllow(uploadType, allowType) {
    return allowType.some((fileType) => fileType == uploadType)
}
/*
function genUniqueSuffix(){
    return `${moment.now()}-${Math.round(Math.random() * 1E9)}`
}*/

module.exports = { uploadExcelFile, uploadPowerPointFile, uploadPowerPointFileLocal }