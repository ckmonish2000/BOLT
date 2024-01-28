const config = {
  azure: {
    storage: {
      accountName: process.env.BOLT_AZURE_STORAGE_ACCOUNT_NAME,
      accountKey: process.env.BOLT_AZURE_STORAGE_KEY,
    },
  },
};

module.exports = config;
