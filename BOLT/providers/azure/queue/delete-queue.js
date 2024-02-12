const R = require("ramda");
const respond = require("../../../utils/respond");

const deleteQueue = async (client, resourceGroup, nameSpace, queueName) => {
  try {
    const res = await client.queues.delete(resourceGroup, nameSpace, queueName);
    return respond(true, "Successfully deleted queue", res);
  } catch (err) {
    respond(false, "Successfully deleted queue", null, err);
  }
};

module.exports = R.curry(deleteQueue);
