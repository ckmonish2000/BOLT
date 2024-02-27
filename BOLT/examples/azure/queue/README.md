To begin using service bus queues you need to setup the following keys in your environment file:

```
BOLT_AZURE_QUEUE_CONNECTION_STRING={YOUR_AZURE_QUEUE_CONNECTION_STRING}
BOLT_AZURE_ENTRA_APP_TENANT_ID={YOUR_AZURE_ENTRA_APP_TENANT_ID}
BOLT_AZURE_ENTRA_APP_CLIENT_ID={YOUR_AZURE_ENTRA_APP_CLIENT_ID}
BOLT_AZURE_ENTRA_APP_CLIENT_SECRET={YOUR_AZURE_ENTRA_APP_CLIENT_SECRET}
BOLT_AZURE_SUBSCRIPTION_ID={YOUR_AZURE_SUBSCRIPTION_ID}
```

## Create queue client

```javascript
    const BOLT = require("../../..")("azure");
    const queueClient = BOLT.queue();
```

## Create or update a queue

```javascript
  const newQueue = await queueClient.createQueue(
    resourceGroup,
    nameSpace,
    queueName
  );
```

## Delete a queue

```javascript
  const delRes = await queueClient.deleteQueue(
    resourceGroup,
    nameSpace,
    queueName
  );
```

## Send message to a queue

```javascript
    const response = await queueClient.sendMessage(queueName, [{body:"Bro code"}]);
```

## Receive message to a queue

```javascript
    const myMessageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
    };
    const myErrorHandler = async (error) => {
        console.log(error);
    };
    await queueClient.getMessages(queueName,myMessageHandler,myErrorHandler)
```