# Blob storage

To begin using blob storage you need to setup the following keys in your environment file:

```
BOLT_AZURE_STORAGE_ACCOUNT_NAME={YOUR_AZURE_STORAGE_ACCOUNT_NAME}
BOLT_AZURE_STORAGE_KEY={YOUR_AZURE_STORAGE_KEY}
```

## Create storage container
```javascript
    const container = await azure.blob.createContainer("myfirstcontainer");
```  
## List all storage container
```javascript
    const conatiners = await azure.blob.listAllConatiners();
```
## Upload stream of blob to container
```javascript
    const fileStream = await fs.createReadStream("./test.txt");
    const response = await azure.blob.upload("myfirstcontainer", "f5", fileStream);
```
## Upload buffer or string to container
```javascript
    const buffer = await fs.readFileSync("./test.txt");
    const response = await azure.blob.upload("myfirstcontainer", "buffer", buffer);
```
## Get presigned blob URL
```javascript
    const url = await azure.blob.getUrl("myfirstcontainer", "f5.txt");
```
## Get readable stream for a blob
```javascript
    const fileStream = await azure.blob.get("myfirstcontainer", "f5.txt");
    const downloaded = await streamToBuffer(fileStream);
```