const R = require("ramda");
const respond = require("../../../utils/respond");

const {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const getUrl = async (blobServiceClient, containerName, fileName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobBatchClient(fileName);
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 1);
    const permissions = BlobSASPermissions.parse("r");
    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        blobName: blobClient.blobName,
        permissions: permissions,
        startsOn: new Date(),
        expiresOn: expiryTime,
      },
      blobServiceClient.credential
    ).toString();

    const blobServiceUrl = `https://${account}.blob.core.windows.net`;
    const containerUrl = `${blobServiceUrl}/${containerName}`;
    const url = `${containerUrl}/${fileName}?${sasToken}`;
    return respond(true, "Successfully generate presigned URL", url);
  } catch (err) {
    return respond(false, "Failed to generate presigned URL", null, err);
  }
};

module.exports = R.curry(getUrl);
