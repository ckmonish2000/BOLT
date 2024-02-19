require("dotenv").config();
const BOLT = require("./BOLT")("aws");

const main = async () => {
  const storageClient = BOLT.storage();
  const bucketName = "babablacksheephaveyouanywool";

  // METHOD TO: CREATE BUCKET
  //   const createResponse = await storageClient.createContainer(bucketName);
  //   console.log(createResponse);

  // METHOD TO: DELETE BUCKET
  //   const deleteResponse = await storageClient.deleteContainer(bucketName);
  //   console.log(deleteResponse);

  // METHOD TO: FETCH ALL BUCKETS
  //   const listOfBuckets =  await storageClient.listAllConatiners();
  //   console.log(listOfBuckets?.response?.Buckets);
};

main();
