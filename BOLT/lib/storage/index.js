const { azure } = require("../../providers");
const R = require("ramda");
const azureStorageClient = azure.blob;

const toLowerCase = R.toLower;
const invalidProvider = () => {
  throw new Error("Invalid storage provider");
};

const createStorageClient = R.cond([
  [R.pipe(toLowerCase, R.equals("azure")), R.always(azureStorageClient)],
  [R.T, R.always(invalidProvider)],
]);

module.exports = createStorageClient;
