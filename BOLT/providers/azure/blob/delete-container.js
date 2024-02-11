const R = require("ramda");
const respond = require("../../../utils/respond");

const deleteContainer = async (blobServiceClient, containerName) => {
  try {
    const res = await blobServiceClient.deleteContainer(containerName);
    return respond(true, "Successfully deleted container", res);
  } catch (err) {
    return respond(false, "Failed to delete container", null, err);
  }
};

module.exports = R.curry(deleteContainer);
