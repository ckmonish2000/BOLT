const R = require("ramda");
const {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");
const respond = require("../../../utils/respond");

const getPreSignedUrl = async (
  blobServiceClient,
  accountName,
  containerName,
  fileName
) => {
  try {
    // fileName = fileName + `_${Date.now()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobBatchClient(fileName);
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    const permissions = BlobSASPermissions.parse("a");
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
    const presignedUrl = `https://${accountName}.blob.core.windows.net/?${sasToken}`;
    return respond(false, "Successfully generated presigned url", presignedUrl);
  } catch (error) {
    return respond(false, "Failed to generate presigned url", null, error);
  }
};
module.exports = R.curry(getPreSignedUrl);
