const { ServiceBusClient } = require("@azure/service-bus");
const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { ClientSecretCredential } = require("@azure/identity");
const sendMessage = require("./send-message");
const getMessages = require("./get-message");
const createQueue = require("./create-queue");
const deleteQueue = require("./delete-queue");

module.exports = () => {
  let methods = {};
  const queueConnectionString = process.env.BOLT_AZURE_QUEUE_CONNECTION_STRING;
  const tenantId = process.env.BOLT_AZURE_ENTRA_APP_TENANT_ID;
  const clientId = process.env.BOLT_AZURE_ENTRA_APP_CLIENT_ID;
  const clientSecret = process.env.BOLT_AZURE_ENTRA_APP_CLIENT_SECRET;
  const subscriptionId = process.env.BOLT_AZURE_SUBSCRIPTION_ID;

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
