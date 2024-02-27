const { ServiceBusClient } = require("@azure/service-bus");
const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { ClientSecretCredential } = require("@azure/identity");
const sendMessage = require("./send-message");
const getMessages = require("./get-message");
const createQueue = require("./create-queue");
const deleteQueue = require("./delete-queue");
const config = require("../../../config");

module.exports = () => {
  let methods = {};
  const queueConnectionString = config.azure.queue.queueConnectionString;
  const tenantId = config.azure.app.tenantId;
  const clientId = config.azure.app.clientId;
  const clientSecret = config.azure.app.clientSecret;
  const subscriptionId = config.azure.subscriptionId;

  if (queueConnectionString) {
    const sbClient = new ServiceBusClient(queueConnectionString);
    methods["sendMessage"] = sendMessage(sbClient);
    methods["getMessages"] = getMessages(sbClient);
  }

  if (tenantId && clientId && clientSecret) {
    const sbManagementClient = new ServiceBusManagementClient(
      new ClientSecretCredential(tenantId, clientId, clientSecret),
      subscriptionId
    );

    methods["createQueue"] = createQueue(sbManagementClient);
    methods["deleteQueue"] = deleteQueue(sbManagementClient);
  }

  if (Object.keys(methods)?.length === 0)
    throw new Error("Please setup your environment to use storage function");

  return methods;
};
