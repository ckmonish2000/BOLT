const R = require("ramda");
const { Stream } = require("stream");
const respond = require("../../../utils/respond");

const upload = async (blobServiceClient, containerName, fileName, file) => {
  try {
    let res;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);

    const useUploadStream = file instanceof Stream;
    const useUpload = Buffer.isBuffer(file);
    const isInvalidFile = !useUploadStream && !useUpload;

    if (isInvalidFile) throw new Error("Invalid file format");

    if (useUploadStream) {
      res = await blobClient.uploadStream(file);
    }

    if (useUpload) {
      res = await blobClient.upload(file, file.length);
    }

    return respond(true, "File uploaded", res);
  } catch (err) {
    return respond(false, "Failed to upload file", null, err);
  }
};

module.exports = R.curry(upload);
