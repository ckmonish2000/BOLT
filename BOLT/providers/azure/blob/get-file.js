const R = require("ramda");
const respond = require("../../../utils/respond");

const get = async (blobServiceClient, containerName, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(fileName);
    const file = await blobClient.download();
    return respond(true, "Successfully fetched file", file.readableStreamBody);
  } catch (err) {
    respond(false, "Failed to fetch file", null, err);
  }
};

module.exports = R.curry(get);
