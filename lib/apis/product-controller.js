const moment = require('moment');
const logger = require('../logger');
const Product = require('../models/product');

const productController = (apiRouter) => {
  apiRouter.get('/products', (req, res) => {
    Product.getAllWithActivePrice().then(products => res.json({products})).catch((err) => {
      logger.error(`products find error : ${err.message}`);
      return res.status(500).json({error: 'Products find error'});
    });
  });

  apiRouter.get('/products/:id', (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({error: 'Validation error !'});
    }
    Product.getWithActivePrice(req.params.id).then(product => res.json({product})).catch((err) => {
      logger.error(`product find error : ${err.message}`);
      return res.status(500).json({error: 'Product find error'});
    });
  });
};

module.exports = {
  default: productController
};
