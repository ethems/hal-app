const productController = require('./product-controller');

module.exports = (apiRouter, config) => {
  productController.default(apiRouter, config);
};
