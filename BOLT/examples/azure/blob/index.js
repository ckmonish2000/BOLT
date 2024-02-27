require("dotenv").config();
const path = require("path");
const BOLT = require("../../../index")("azure");
const storageClient = BOLT.storage();
const fs = require("fs");

const main = async () => {
  // METHOD TO: Create storage container
  const containerName = "tempcontainer";
  const container = await storageClient.createContainer(containerName);
  // METHOD TO: List all storage container
  const conatiners = await storageClient.listAllConatiners();
  // METHOD TO: Delete blob container
  const deletedResponse = await storageClient.deleteContainer(containerName);
  // METHOD TO: Upload stream of blob to container
  const fileStream = await fs.createReadStream(path.join(__dirname,"./test.txt"));
  const uploadStreamRes = await storageClient.upload(
    "myfirstcontainer",
    "f5.txt",
    fileStream
  );
  // METHOD TO: Upload buffer or string to container
  const buffer = await fs.readFileSync(path.join(__dirname,"./test.txt"));
  const uploadBufferRes = await storageClient.upload(
    "myfirstcontainer",
    "buffer.txt",
    buffer
  );
  // METHOD TO: Get presigned blob URL
  const url = await storageClient.getUrl("myfirstcontainer", "f5.txt");
  // METHOD TO: Get readable stream for a blob
  const fileReadStream = await storageClient.get("myfirstcontainer", "f5.txt");
  const downloaded = await streamToBuffer(fileReadStream.response);
  console.log("Downloaded blob content:", downloaded.toString());
  // METHOD TO: Delete blob
  const deleteBlobRes = await storageClient.remove(
    "myfirstcontainer",
    "buffer.txt"
  );
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main();
