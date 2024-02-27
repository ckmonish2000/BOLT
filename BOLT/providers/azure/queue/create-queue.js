const R = require("ramda");
const respond = require("../../../utils/respond");

const createQueue = async (client, resourceGroup, nameSpace, queueName,parameters={}) =>
  new Promise(async (resolve, reject) => {
    try {
      await client.queues.createOrUpdate(
        resourceGroup,
        nameSpace,
        queueName,
        parameters,
        {
          onResponse: (res) =>
            resolve(respond(true, "Successfully create your queue", res)),
        }
      );
    } catch (err) {
      reject(
        respond(false, "Something went wrong while creating queue", null, err)
      );
    }
  });

module.exports = R.curry(createQueue);
