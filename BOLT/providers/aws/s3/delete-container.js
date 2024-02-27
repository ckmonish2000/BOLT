const R = require("ramda");
const { DeleteBucketCommand } = require("@aws-sdk/client-s3");
const respond = require("../../../utils/respond");

const deleteContainer = async (s3Client, name, config = {}) => {
  try {
    if (!name) throw new Error("Please pass a name for your bucket");
    config["Bucket"] = name;
    const command = new DeleteBucketCommand(config);
    const response = await s3Client.send(command);
    return respond(true, "Successfully deleted storage bucket", response);
  } catch (error) {
    return respond(false, "Failed to delete storage bucket", null, error);
  }
};

module.exports = R.curry(deleteContainer);
