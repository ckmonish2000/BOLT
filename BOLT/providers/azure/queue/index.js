const {
  ServiceBusClient,
  delay,
  ServiceBusMessage,
} = require("@azure/service-bus");
const respond = require("../../../utils/respond");

const sbClient = new ServiceBusClient(
  process.env.BOLt_AZURE_QUEUE_CONNECTION_STRING
);

const sendMessage = async (queueName, messages = []) => {
  const sender = sbClient.createSender(queueName);
  try {
    let batch = await sender.createMessageBatch();
    for (let i = 0; i < messages.length; i++) {
      if (!batch.tryAddMessage(messages[i])) {
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();
        if (!batch.tryAddMessage(messages[i])) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }
    await sender.sendMessages(batch);

    console.log(`Sent a batch of messages to the queue: ${queueName}`);

    // Close the sender
    await sender.close();
    return respond(true, `Successfully sent message to ${queueName}`);
  } catch (err) {
    await sbClient.close();
    return respond(false, `Failed to send message to ${queueName}`, null, err);
  } finally {
    await sbClient.close();
  }
};

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

module.exports = { sendMessage, getMessages };
