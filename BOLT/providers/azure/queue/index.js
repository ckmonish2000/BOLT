const { ServiceBusClient } = require("@azure/service-bus");
const sendMessage = require("./send-message");
const getMessages = require("./get-message");
const createQueue = require("./create-queue");

module.exports = () => {
  const sbClient = new ServiceBusClient(
    process.env.BOLT_AZURE_QUEUE_CONNECTION_STRING
  );
  return {
    sendMessage: sendMessage(sbClient),
    getMessages: getMessages(sbClient),
    createQueue: createQueue,
  };
};
