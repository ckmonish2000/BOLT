const R = require("ramda");
const storage = require("./storage");

const methods = {
  storage,
};
const fetchProviderMethods = R.curry((provider, method) => method(provider));
module.exports = (provider) =>
  R.mapObjIndexed(fetchProviderMethods(provider), methods);
