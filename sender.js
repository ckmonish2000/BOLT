require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const queueClient = BOLT.queue;
const R = require("ramda");

const main = async () => {
  const queueName = "firstqueue";
  // METHOD TO: Send messages to a queue
  const response = await BOLT.queue.sendMessage(queueName, [{body:"Bro code"}]);
  console.log(response)
};

main();
