const R = require("ramda");
const { ListBucketsCommand } = require("@aws-sdk/client-s3");
const respond = require("../../../utils/respond");

const listAllContainers = (s3Client) => async (config={}) => {
  try {
    const command = new ListBucketsCommand(config);
    const response = await s3Client.send(command);
    return respond(
      true,
      "Successfully fetched list of storage buckets",
      response
    );
  } catch (error) {
    return respond(
      false,
      "Failed to fetch list of storage buckets",
      null,
      error
    );
  }
};

module.exports = listAllContainers;
