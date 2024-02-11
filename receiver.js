require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const R = require("ramda");

const main = async () => {
  const queueName = "firstqueue";
  const queueClient = BOLT.queue();
  // METHOD TO: Get messages to a queue
  // const response = await BOLT.queue.sendMessage(queueName, [{body:"Bro whats up"}]);
  // console.log(response)

  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
  };
  const myErrorHandler = async (error) => {
    console.log(error);
  };
  await queueClient.getMessages(queueName,myMessageHandler,myErrorHandler)
};

main();
