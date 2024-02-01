const R = require("ramda");
const storage = require("./storage");
const queue = require("./queue");

const methods = {
  storage,
  queue,
};

const fetchProviderMethods = R.curry((provider, method) => method(provider));
module.exports = (provider) =>
  R.mapObjIndexed(fetchProviderMethods(provider), methods);
