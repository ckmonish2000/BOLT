require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const R = require("ramda");
const queueClient = BOLT.queue();

const main = async () => {
  const resourceGroup = "db";
  const nameSpace = "mcktryout";
  const queueName = "myNewQueue";

//   const newQueue = await queueClient.createQueue(resourceGroup, nameSpace, queueName);
//   console.log(newQueue)
//   console.log(await queueClient.deleteQueue(resourceGroup, nameSpace, queueName))
console.log(queueClient)
};

main();
