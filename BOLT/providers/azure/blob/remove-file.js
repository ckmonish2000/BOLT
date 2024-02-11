const R = require("ramda");
const respond = require("../../../utils/respond");

const remove = async (blobServiceClient, containerName, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(fileName);
    const res = await blobClient.deleteIfExists();
    return respond(true, "Successfully deleted file", res);
  } catch (err) {
    return respond(false, "Failed to delete file", null, err);
  }
};

module.exports = R.curry(remove);
