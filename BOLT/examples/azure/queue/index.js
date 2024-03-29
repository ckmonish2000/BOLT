require("dotenv").config();
const BOLT = require("../../..")("azure");
const R = require("ramda");

const main = async () => {
  const queueClient = BOLT.queue();
  const resourceGroup = "db";
  const nameSpace = "mcktryout";
  const queueName = "myNewQueue";

  // METHOD TO: create new queue
  const newQueue = await queueClient.createQueue(
    resourceGroup,
    nameSpace,
    queueName
  );

  // METHOD TO: delete a queue

  const delRes = await queueClient.deleteQueue(
    resourceGroup,
    nameSpace,
    queueName
  );
};

main();
