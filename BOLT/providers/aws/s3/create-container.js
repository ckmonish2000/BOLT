const R = require("ramda");
const { CreateBucketCommand } = require("@aws-sdk/client-s3");
const respond = require("../../../utils/respond");

const createContainer = async (s3Client, name, config = {}) => {
  try {
    if (!name) throw new Error("Please pass a name for your bucket");
    config["Bucket"] = name;
    const command = new CreateBucketCommand(config);
    const response = await s3Client.send(command);
    return respond(true, "Successfully created storage bucket", response);
  } catch (err) {
    return respond(false, "Failed to create storage bucket", null, err);
  }
};

module.exports = R.curry(createContainer);
