const { delay } = require("@azure/service-bus");
const R = require("ramda");

const getMessages = async (
  sbClient,
  queueName,
  onMessage,
  onError,
  ms = 20000
) => {
  const receiver = sbClient.createReceiver(queueName);

  receiver.subscribe({
    processMessage: onMessage,
    processError: onError,
  });

  await delay(ms);

  await receiver.close();
  await sbClient.close();
};

module.exports = R.curry(getMessages);
