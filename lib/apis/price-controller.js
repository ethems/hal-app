const moment = require('moment');
const logger = require('../logger');
const units = require('../models/price-units');
const co = require('co');
const Price = require('../models/price');
const Product = require('../models/product');
const _ = require('lodash');

const priceController = (apiRouter) => {
  apiRouter.get('/prices/units', (req, res) => res.json({units}));
  apiRouter.get('/prices/:productid/:timespan', (req, res) => {
    req.check('productid', 'ID is mandatory').notEmpty();
    req.check('timespan', 'Timespan is mandatory').notEmpty().isAlpha();
    co(function * () {
      const errors = yield req.getValidationResult();
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
      }
      const productId = req.params.productid;
      const timespan = req.params.timespan.toLowerCase();
      const timespanTypes = {
        daily: 'days',
        weekly: 'weeks',
        monthly: 'months',
        yearly: 'years'
      };
      const sinceTime = moment().subtract(1, timespanTypes[timespan] || 'days');
      const prices = yield Price.getAllSince(productId, sinceTime);
      const product = yield Product.findById(productId);
      return {prices, productId, timespan, product};
    }).then(result => res.json({
      prices: result.prices,
      productId: result.productId,
      timespanType: result.timespan,
      product: _.pick(result.product, ['name'])
    })).catch((err) => {
      logger.error(`prices find error : ${err.message}`);
      return res.status(500).json({error: 'prices find error'});
    });
  });
};

module.exports = {
  default: priceController
};
