require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const queueClient = BOLT.queue;
const R = require("ramda");

const main = async () => {
  const queueName = "myfirstqueue";
  // METHOD TO: Create new queue
  const res = await queueClient.createQueue(queueName);
  // METHOD TO: Fetch all queues
  const queues = await queueClient.listAllQueues();
  // METHOD TO: Delete queue
  // const delRes = await queueClient.deleteQueue(queueName)
  // METHOD TO: Send message to a queue
  // const sendMessage = await queueClient.sendMessage(queueName,{hello:"world"})
  // METHOD TO: Get message from a queue
  const getMessages = await queueClient.getMessages(queueName);
};

main();
