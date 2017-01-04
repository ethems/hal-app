const productController = require('./product-controller');
const priceController = require('./price-controller');

module.exports = (apiRouter, config) => {
  productController.default(apiRouter, config);
  priceController.default(apiRouter, config);
};
