const sbClient = require("./client");
const { delay } = require("@azure/service-bus");

const getMessages = async (queueName, onMessage, onError, ms = 20000) => {
  const receiver = sbClient.createReceiver(queueName);

  receiver.subscribe({
    processMessage: onMessage,
    processError: onError,
  });

  await delay(ms);

  await receiver.close();
  await sbClient.close();
};

module.exports = getMessages;
