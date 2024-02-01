require("dotenv").config();
const BOLT = require("./BOLT")("azure");
const R = require("ramda");

const main = async () => {
  const storageClient = BOLT.storage
  console.log(storageClient)
};

main();
