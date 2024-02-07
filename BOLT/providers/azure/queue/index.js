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

const listAllQueues = async () => {
  try {
    const allQueues = [];
    let queues = queueServiceClient.listQueues();
    for await (const queue of queues) {
      allQueues.push(queue);
    }
    return respond(true, "Successfully fetched list of all queues", allQueues);
  } catch (err) {
    return respond(true, "Failed to fetch list of queues", null, err);
  }
};

const sendMessage = async (queueName, msg) => {
  const queueClient = await queueServiceClient.getQueueClient(queueName);
  return await queueClient.sendMessage(JSON.stringify(msg));
};

const getMessages = async (queueName) => {
  const queueClient = await queueServiceClient.getQueueClient(queueName);
  console.log(await queueClient.receiveMessages());
};

module.exports = {
  createQueue,
  deleteQueue,
  listAllQueues,
  sendMessage,
  getMessages,
};
