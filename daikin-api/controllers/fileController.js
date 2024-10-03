const models = require("../models");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const { errorJson } = require("../helpers/error");

const { getBlob } = require("../helpers/storage");
const { SCREENSHOT } = require("../constants/container");
const { ModelFile, SeriesFile } = models;

axiosRetry(axios, {
  retryDelay: () => 3000,
  retries: 3,
  onRetry: (retryCount) => {
    console.log(`Retry : ${retryCount}`);
    return;
  },
  retryCondition: (responseResult) => {
    return responseResult.data;
  },
});

module.exports = {
  async uploadExcel(req, res) {
    try {
      if (!req.file) {
        throw Error("No File!");
      }

      res.json({
        blobName: req.file.blobName,
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async uploadPowerPoint(req, res) {
    try {
      if (!req.file) {
        throw Error("No File!");
      }
      //const buffer = await fs.readFile(req.file.path)
      //const pdfUrl = await generatePDFLocal(buffer, req.file.filename)
      //const pdfUrl = await googleServicePDFPreview(req.file.url, req.file.blobName)
      res.json({
        blobName: req.file.blobName,
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async listPreviewImage(req, res) {
    try {
      const { type, id } = req.params;
      switch (type) {
        case "Series":
          const sereiesFile = await SeriesFile.findOne({
            where: { FileID: id },
          });
          if (!sereiesFile) {
            return res.status(404).end();
          }
          const seriesImageList = [];
          for (let i = 1; i <= sereiesFile.PageCounter; i++) {
            const seriesFileName = seriesImageList.Path.split(".")[0];
            const screenshotName = seriesFileName.PageCounter > 1 ? seriesFileName + "-" + i + ".png" : seriesFileName + ".png";

            const blob = await getBlob(screenshotName, SCREENSHOT);
            if (await blob.exists()) {
              seriesImageList.push(blob.url);
            }
          }
          return res.json(seriesImageList);
        case "Model":
          const modelFile = await ModelFile.findOne({
            where: { FileID: id },
          });
          if (!modelFile) {
            return res.status(404).end();
          }
          const modelImageList = [];
          for (let i = 1; i <= modelFile.PageCounter; i++) {
            const modelFileName = modelFile.Path.split(".")[0];
            const screenshotName = modelFile.PageCounter > 1 ? modelFileName + "-" + i + ".png" : modelFileName + ".png";

            const blob = await getBlob(screenshotName, SCREENSHOT);
            if (await blob.exists()) {
              modelImageList.push(blob.url);
            }
          }
          return res.json(modelImageList);
      }
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  }
};
