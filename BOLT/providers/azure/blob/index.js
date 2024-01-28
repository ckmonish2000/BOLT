const config = require("../../../config");
const respond = require("../../../utils/respond");
const { Stream } = require("stream");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const account = config.azure.storage.accountName;
const accountKey = config.azure.storage.accountKey;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const createContainer = async (name) => {
  try {
    if (!name) throw new Error("Container name is required");

    const containerClient = blobServiceClient.getContainerClient(name);
    const res = await containerClient.create();
    return respond(true, "container created", res);
  } catch (err) {
    return respond(true, "something went wrong", null, err);
  }
};

const listAllConatiners = async () => {
  try {
    const allContainers = [];
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      allContainers.push(container);
    }
    return respond(true, "List of all containers fetched", allContainers);
  } catch (err) {
    return respond(true, "something went wrong", null, err);
  }
};

const upload = async (containerName, fileName, file) => {
  try {
    let res;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);

    const useUploadStream = file instanceof Stream;
    const useUpload = Buffer.isBuffer(file);
    const isInvalidFile = !useUploadStream && !useUpload;

    if (isInvalidFile) throw new Error("Invalid file format");

    if (useUploadStream) {
      res = await blobClient.uploadStream(file);
    }

    if (useUpload) {
      res = await blobClient.upload(file, file.length);
    }

    return respond(true, "File uploaded", res);
  } catch (err) {
    return respond(false, "Failed to upload file", null, err);
  }
};

const getUrl = async (containerName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobBatchClient(fileName);
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);
  const permissions = BlobSASPermissions.parse("r");
  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      blobName: blobClient.blobName,
      permissions: permissions,
      startsOn: new Date(),
      expiresOn: expiryTime,
    },
    blobServiceClient.credential
  ).toString();

  const blobServiceUrl = `https://${account}.blob.core.windows.net`;
  const containerUrl = `${blobServiceUrl}/${containerName}`;
  return `${containerUrl}/${fileName}?${sasToken}`;
};

const get = async (containerName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(fileName);
  const file = await blobClient.download();
  return file.readableStreamBody;
};

module.exports = { createContainer, listAllConatiners, upload, getUrl, get };
