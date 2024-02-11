require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const R = require("ramda");
const queueClient = BOLT.queue();

const main = async () => {
    queueClient.createQueue()
};

main();
