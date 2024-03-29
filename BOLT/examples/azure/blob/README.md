# Blob storage

To begin using blob storage you need to setup the following keys in your environment file:

```
BOLT_AZURE_STORAGE_ACCOUNT_NAME={YOUR_AZURE_STORAGE_ACCOUNT_NAME}
BOLT_AZURE_STORAGE_KEY={YOUR_AZURE_STORAGE_KEY}
```
## Create storage client

```javascript
    const BOLT = require("../../../index")("azure");
    const storageClient = BOLT.storage();
```

## Create storage container
```javascript
    const container = await storageClient.createContainer("myfirstcontainer");
```  

## List all storage container
```javascript
    const conatiners = await storageClient.listAllConatiners();
```

## Delete blob container
```javascript
    const containerName = "tempcontainer";
    await storageClient.createContainer(containerName);
    const deletedResponse = await storageClient.deleteContainer(containerName);
```

## Upload stream of blob to container
```javascript
    const fileStream = await fs.createReadStream("./test.txt");
    const response = await storageClient.upload("myfirstcontainer", "f5", fileStream);
```

## Upload buffer or string to container
```javascript
    const buffer = await fs.readFileSync("./test.txt");
    const response = await storageClient.upload("myfirstcontainer", "buffer", buffer);
```

## Get presigned blob URL
```javascript
    const url = await storageClient.getUrl("myfirstcontainer", "f5.txt");
```

## Get readable stream for a blob
```javascript
    const fileStream = await storageClient.get("myfirstcontainer", "f5.txt");
    const downloaded = await streamToBuffer(fileReadStream.response);
```

## Delete blob
```javascript
    const deleteBlobRes = await storageClient.remove(
        "myfirstcontainer",
        "buffer.txt"
    );
```