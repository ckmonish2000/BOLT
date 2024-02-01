const { azure } = require("../../providers");
const R = require("ramda");
const azureQueueClient = azure.queue;

const toLowerCase = R.toLower;
const invalidProvider = () => {
  throw new Error("Invalid queue provider");
};

const createStorageClient = R.cond([
  [R.pipe(toLowerCase, R.equals("azure")), R.always(azureQueueClient)],
  [R.T, R.always(invalidProvider)],
]);

module.exports = createStorageClient;
