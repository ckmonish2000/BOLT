const AzureStorageQueue = require("@azure/storage-queue");
const {
  QueueServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-queue");
const config = require("../../../config");
const respond = require("../../../utils/respond");

const account = config.azure.storage.accountName;
const accountKey = config.azure.storage.accountKey;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  sharedKeyCredential
);

const createQueue = async (queueName) => {
  try {
    const res = await queueServiceClient.createQueue(queueName);
    return respond(true, "Sucessfully created queue", res);
  } catch (err) {
    return respond(false, "Failed to create queue", null, err);
  }
};

const deleteQueue = async (queueName) => {
    try {
      const res = await queueServiceClient.deleteQueue(queueName);
      return respond(true, "Sucessfully deleted queue", res);
    } catch (err) {
      return respond(false, "Failed to delete queue", null, err);
    }
  };

module.exports = { createQueue,deleteQueue };
