require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const queueClient = BOLT.queue
const R = require("ramda");

const main = async () => {
    const queueName = "myfirstqueue";
    // METHOD TO: Create new queue
    const res = await queueClient.createQueue(queueName)
    // METHOD TO: Delete queue
    const delRes = await queueClient.deleteQueue(queueName)
};

main();
