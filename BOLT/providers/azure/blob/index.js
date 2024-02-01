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

const deleteContainer = async (containerName) => {
  try {
    const res = await blobServiceClient.deleteContainer(containerName);
    return respond(true, "Successfully deleted container", res);
  } catch (err) {
    return respond(false, "Failed to delete container", null, err);
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
  try {
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
    const url = `${containerUrl}/${fileName}?${sasToken}`;
    return respond(true, "Successfully generate presigned URL", url);
  } catch (err) {
    return respond(false, "Failed to generate presigned URL", null, err);
  }
};

const get = async (containerName, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(fileName);
    const file = await blobClient.download();
    return respond(true, "Successfully fetched file", file.readableStreamBody);
  } catch (err) {
    respond(false, "Failed to fetch file", null, err);
  }
};

const remove = async (containerName, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(fileName);
    const res = await blobClient.deleteIfExists();
    return respond(true, "Successfully deleted file", res);
  } catch (err) {
    return respond(false, "Failed to delete file", null, err);
  }
};

module.exports = {
  createContainer,
  listAllConatiners,
  deleteContainer,
  upload,
  getUrl,
  get,
  remove,
};
