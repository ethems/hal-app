const moment = require('moment');
const logger = require('../logger');
const _ = require('lodash');
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
      const product = yield Product.getWithActivePrice(productId);
      return product;
    }).then(product => res.json({product})).catch((err) => {
      logger.error(`product find error : ${err.message}`);
      return res.status(500).json({error: 'Product find error'});
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
      const timespanTypes = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month',
        yearly: 'year'
      };
      const sinceTime = moment().startOf(timespanTypes[timespan] || 'day');
      const product = yield Product.getWithAllPricesSince(productId, sinceTime);
      return product;
    }).then(product => res.json({product})).catch((err) => {
      logger.error(`product find error : ${err.message}`);
      return res.status(500).json({error: 'Product find error'});
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
        price: (+ req.body.price)
      };
      const product = yield Product.updatePrice(productId, price);
      logger.info(`${product.name}'s price was updated to ${price.price}`);
      return res.json({product});
    }).catch((err) => {
      logger.error(`price update error :  ${err.message}`);
      return res.status(500).json({error: 'Price update error'});
    });
  });
  const asyncUpdateProduct = (body) => {
    const {id, name, newPrice, active} = body;
    return co(function * () {
      const product = yield Product.getWithActivePrice(id);
      const previousActivePrice = product.priceHistory.length === 1
        ? product.priceHistory[0]
        : null;
      // product.name = name;
      // product.active = active;
      Object.assign(product, {name, active});
      let uProduct = yield product.save();
      logger.info(`product updated  : ${uProduct.name}`);
      if (newPrice && !_.isEqual(_.pick(previousActivePrice, ['price', 'unit', 'currency']), _.pick(newPrice, ['price', 'unit', 'currency']))) {
        uProduct = yield Product.updatePrice(id, _.omit(newPrice, ['id', '_id', 'startDate']));
        logger.info(`${uProduct.name}'s price was updated to ${newPrice.price}`);
      }
      return uProduct;
    });
  };
  const asyncCreateProduct = (body) => {
    const {name, newPrice, active} = body;
    const product = {
      name,
      active
    };
    return co(function * () {
      let cProduct = yield Product.create(product);
      logger.info(`new product created  : ${cProduct.name}`);
      if (newPrice) {
        cProduct = yield Product.updatePrice(cProduct.id, newPrice);
        logger.info(`${cProduct.name}'s price was updated to ${newPrice.price}`);
      }
      return cProduct;
    });
  };
  apiRouter.put('/product', (req, res) => {
    req.checkBody('name', 'Invalid name').len(1, 50);
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.body.id;
      if (productId) {
        // Update existed product
        const product = yield asyncUpdateProduct(req.body);
        return product;
      }
      // Create new product
      const product = yield asyncCreateProduct(req.body);
      return product;
    }).then(product => res.json({product})).catch((err) => {
      logger.error(`Product upsert error : ${err.message}`);
      return res.status(500).json({error: err.message});
    });
  });

  apiRouter.delete('/products/:id', (req, res) => {
    req.check('id', 'ID is mandatory').notEmpty();
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.params.id;
      const deletedProduct = yield Product.softDelete(productId);
      logger.info(`${deletedProduct.name} was deleted`);
      return res.json({product: deletedProduct});
    }).catch((err) => {
      logger.error(`price delete error :  ${err.message}`);
      return res.status(500).json({error: 'Product delete error'});
    });
  });
};

module.exports = {
  default: productController
};
