const {
  ServiceBusClient,
  delay,
  ServiceBusMessage,
} = require("@azure/service-bus");

const sbClient = new ServiceBusClient(
  process.env.BOLt_AZURE_QUEUE_CONNECTION_STRING
);

module.exports = sbClient;
