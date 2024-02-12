const config = {
  azure: {
    subscriptionId: process.env.BOLT_AZURE_SUBSCRIPTION_ID,
    app: {
      tenantId: process.env.BOLT_AZURE_ENTRA_APP_TENANT_ID,
      clientId: process.env.BOLT_AZURE_ENTRA_APP_CLIENT_ID,
      clientSecret: process.env.BOLT_AZURE_ENTRA_APP_CLIENT_SECRET,
    },
    queue:{
      queueConnectionString:process.env.BOLT_AZURE_QUEUE_CONNECTION_STRING
    },
    storage: {
      accountName: process.env.BOLT_AZURE_STORAGE_ACCOUNT_NAME,
      accountKey: process.env.BOLT_AZURE_STORAGE_KEY,
    },
  },
};

module.exports = config;
