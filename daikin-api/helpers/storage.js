require("dotenv").config();

const fs = require("fs/promises");
const { BlobServiceClient } = require("@azure/storage-blob");
const { TEMP_OUTPUT } = require("../constants");
const { PROPOSAL } = require("../constants/container");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

module.exports = {
  async uploadBlob(fileBuff, blobName, fileType, containerName = PROPOSAL) {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadResponse = await blockBlobClient.uploadData(fileBuff, {
      blobHTTPHeaders: { blobContentType: fileType },
    });
    console.log(`Uploaded Blob: ${blobName}`);

    return uploadResponse;
  },
  async uploadFile(filePath, blobName, fileType, containerName = PROPOSAL) {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadResponse = await blockBlobClient.uploadFile(filePath, {
      blobHTTPHeaders: { blobContentType: fileType },
    });
    console.log(`Uploaded File: ${blobName}`);

    return uploadResponse;
  },
  async getBlob(blobName, containerName = PROPOSAL) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobResponse = containerClient.getBlobClient(blobName);

    return blobResponse;
  },
  async deleteBlob(blobName, containerName = PROPOSAL) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log(
      `${new Date().toISOString()} - Recieved Delete Blob: ${blobName}`
    );

    const deleteResponse = await containerClient.deleteBlob(blobName)
    
    return deleteResponse
  },
  async listContainers() {
    const containers = blobServiceClient.listContainers();
    const containerList = [];
    for await (const container of containers) {
      containerList.push(container.name);
    }
    return containerList;
  },
  async listBlobs(containerName) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobs = containerClient.listBlobsFlat();

    return blobs;
  },
  /*async downloadFile(blobName){
        const fileName = `${TEMP_OUTPUT}/${blobName}`
        const isInLocal = await fs.stat(fileName).then(() => true).catch(() => false)
        if(isInLocal){
            const buffer = await fs.readFile(fileName)
            const readStream = new PassThrough()
            readStream.end(buffer)
            return readStream
        }
        const containerClient = blobServiceClient.getContainerClient(CONTAINER.TEST)
        const blobResponse = containerClient.getBlobClient(blobName)
        const buffer = await blobResponse.downloadToBuffer()
        console.log(`Downloaded Blob: ${blobName}`)
        const readStream = new PassThrough()
        readStream.end(buffer)
        
        return readStream
    },*/
  async downloadToTemp(blobName, containerName = PROPOSAL) {
    const fileName = `${TEMP_OUTPUT}/${blobName}`;
    const isInLocal = await fs
      .stat(fileName)
      .then(() => true)
      .catch(() => false);
    if (isInLocal) {
      return fileName;
    }
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobResponse = containerClient.getBlobClient(blobName);
    //const property = await blobResponse.getProperties()
    //console.log(property)
    await blobResponse.downloadToFile(fileName);
    console.log(`Downloaded To Temp Blob: ${blobName}`);
    return fileName;
  },
  STORAGE_PATH: `https://${blobServiceClient.accountName}.blob.core.windows.net/${PROPOSAL}/`,
  getFormmatedName,
  getFormmatedNameProposal,
  formatDate,
  formatDateFullMonth,
};

function getExtensionFromString(str) {
  return str.substring(str.lastIndexOf(".") + 1);
}

// TODO : Move to common helper
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date, char = "-") {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(char);
}

function formatDateFullMonth(date) {
  return [
    date.toLocaleString("en-US", { day: "2-digit" }),
    date.toLocaleString("en-US", { month: "short" }),
    date.getFullYear(),
  ].join("-");
}

function getFormmatedName(prefixName, blobName, languageCode) {
  if (languageCode) {
    return `${prefixName}_${formatDate(
      new Date()
    )}_${languageCode}.${getExtensionFromString(blobName)}`;
  }
  return `${prefixName}_${formatDate(new Date())}.${getExtensionFromString(
    blobName
  )}`;
}

function getFormmatedNameProposal(prefixName, blobName) {
  return `${prefixName}_${formatDate(new Date())}.${getExtensionFromString(
    blobName
  )}`;
}
