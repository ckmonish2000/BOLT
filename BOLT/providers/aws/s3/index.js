const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../../../config").aws;
const createContainer = require("./create-container");
const deleteContainer = require("./delete-container");
const listAllContainers = require("./list-all-containers");

module.exports = () => {
  const s3Client = new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return {
    createContainer: createContainer(s3Client),
    listAllConatiners: listAllContainers(s3Client),
    deleteContainer: deleteContainer(s3Client),
    upload: null,
    getUrl: null,
    get: null,
    remove: null,
  };
};
