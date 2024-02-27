const R = require("ramda");
const respond = require("../../../utils/respond");

const createContainer = async (blobServiceClient, name) => {
  try {
    if (!name) throw new Error("Container name is required");

    const containerClient = blobServiceClient.getContainerClient(name);
    const res = await containerClient.create();
    return respond(true, "container created", res);
  } catch (err) {
    return respond(true, "something went wrong", null, err);
  }
};

module.exports = R.curry(createContainer);
