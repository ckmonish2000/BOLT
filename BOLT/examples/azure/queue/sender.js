require("dotenv").config();
const BOLT = require("../../..")("azure");
const R = require("ramda");

const main = async () => {
  const queueClient = BOLT.queue();
  const queueName = "firstqueue";
  // METHOD TO: Send messages to a queue
  const response = await queueClient.sendMessage(queueName, [{body:"Bro code"}]);
  console.log(response)
};

main();
