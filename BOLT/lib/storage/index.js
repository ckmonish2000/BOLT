const { azure, aws } = require("../../providers");
const R = require("ramda");
const azureStorageClient = azure.blob;
const awsStorageClient = aws.s3;

const toLowerCase = R.toLower;
const invalidProvider = () => {
  throw new Error("Invalid storage provider");
};

const createStorageClient = R.cond([
  [R.pipe(toLowerCase, R.equals("azure")), R.always(azureStorageClient)],
  [R.pipe(toLowerCase, R.equals("aws")), R.always(awsStorageClient)],
  [R.T, R.always(invalidProvider)],
]);

module.exports = createStorageClient;
