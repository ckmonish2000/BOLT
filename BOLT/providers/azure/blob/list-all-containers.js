const respond = require("../../../utils/respond");

const listAllConatiners = (blobServiceClient) => async () => {
  try {
    const allContainers = [];
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      allContainers.push(container);
    }
    return respond(true, "List of all containers fetched", allContainers);
  } catch (err) {
    return respond(true, "something went wrong", null, err);
  }
};

module.exports = listAllConatiners;
