const config = require("../../../config");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const createContainer = require("./create-container");
const listAllConatiners = require("./list-all-containers");
const deleteContainer = require("./delete-container");
const upload = require("./upload-file");
const getUrl = require("./get-download-url");
const get = require("./get-file");
const remove = require("./remove-file");

module.exports = () => {
  const account = config.azure.storage.accountName;
  const accountKey = config.azure.storage.accountKey;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  return {
    createContainer: createContainer(blobServiceClient),
    listAllConatiners: listAllConatiners(blobServiceClient),
    deleteContainer: deleteContainer(blobServiceClient),
    upload: upload(blobServiceClient),
    getUrl: getUrl(blobServiceClient),
    get: get(blobServiceClient),
    remove: remove(blobServiceClient),
  };
};
