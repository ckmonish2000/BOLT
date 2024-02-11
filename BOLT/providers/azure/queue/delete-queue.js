const R = require("ramda");
const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const {
  DefaultAzureCredential,
  ClientSecretCredential,
} = require("@azure/identity");

const deleteQueue = async () => {
  const subscriptionId = "effac336-c2de-4be4-94b5-896716f49834";
  const client = new ServiceBusManagementClient(
    new DefaultAzureCredential(),
    subscriptionId
  );

  await client.queues.delete(
    "db",
    "mcktryout",
    "myNewQueue",
    {},
    {
      onResponse: (res) => {
        console.log(res, "res");
      },
    }
  );
};
module.exports = deleteQueue;
