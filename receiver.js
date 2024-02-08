require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const queueClient = BOLT.queue;
const R = require("ramda");

const main = async () => {
  const queueName = "firstqueue";
  // METHOD TO: Get messages to a queue
  // const response = await BOLT.queue.sendMessage(queueName, [{body:"Bro whats up"}]);
  // console.log(response)

  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
  };
  const myErrorHandler = async (error) => {
    console.log(error);
  };
  await BOLT.queue.getMessages(queueName,myMessageHandler,myErrorHandler)
};

main();
