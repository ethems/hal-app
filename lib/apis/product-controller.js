const moment = require('moment');
const logger = require('../logger');
const Product = require('../models/product');
const co = require('co');

const productController = (apiRouter) => {
  apiRouter.get('/products', (req, res) => {
    Product.getAllWithActivePrice().then(products => res.json({products})).catch((err) => {
      logger.error(`products find error : ${err.message}`);
      return res.status(500).json({error: 'Products find error'});
    });
  });

  apiRouter.get('/products/:id', (req, res) => {
    req.check('id', 'ID is mandatory').notEmpty();
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.params.id;
      Product.getWithActivePrice(productId).then(product => res.json({product})).catch((err) => {
        logger.error(`product find error : ${err.message}`);
        return res.status(500).json({error: 'Product find error'});
      });
    });
  });

  apiRouter.get('/products/:id/:timespan', (req, res) => {
    req.check('id', 'ID is mandatory').notEmpty();
    req.check('timespan', 'Timespan is mandatory').notEmpty().isAlpha();
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.params.id;
      const timespan = req.params.timespan.toLowerCase();
      const timeSpanTypes = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month',
        yearly: 'year'
      };
      const sinceTime = moment().startOf(timeSpanTypes[timespan] || 'day');

      Product.getWithAllPricesSince(productId, sinceTime).then(product => res.json({product})).catch((err) => {
        logger.error(`product find error : ${err.message}`);
        return res.status(500).json({error: 'Product find error'});
      });
    });
  });

  apiRouter.post('/products/:id/price', (req, res) => {
    req.check('id', 'ID is mandatory').notEmpty();
    req.checkBody('price', 'Invalid price').notEmpty().isDecimal();
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.params.id;
      const price = {
        price: + (req.body.price)
      };
      const product = yield Product.updatePrice(productId, price);
      logger.info(`${product.name}'s price was updated to ${price.price}`);
      return res.json({product});
    }).catch((err) => {
      logger.error(`price update error :  ${err.message}`);
      return res.status(500).json({error: 'Price update error'});
    });
  });

  apiRouter.put('/product', (req, res) => {
    req.checkBody('name', 'Invalid name').len(1, 50);
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.body.id;
      const productNewName = req.body.name;
      if (productId) {
        // Update existed product
        const product = yield Product.findById(productId);
        product.name = productNewName;
        const uProduct = yield product.save();
        logger.info(`product updated  : ${uProduct}`);
        return res.json({product: uProduct});
      }
      // Create new product
      const product = {
        name: req.body.name
      };
      const cProduct = yield Product.create(product);
      logger.info(`new product created  : ${cProduct}`);
      return res.json({product: cProduct});
    }).catch((err) => {
      logger.error(`Product upsert error : ${err.message}`);
      return res.status(500).json({error: err.message});
    });
  });

  apiRouter.delete('/products/:id', (req, res) => {
    return res.status(200).json({});
  });
};

module.exports = {
  default: productController
};
