const units = require('../models/price-units');

const priceController = (apiRouter) => {
  apiRouter.get('/price/units', (req, res) => {
    return res.json({units});
  });
};

module.exports = {
  default: priceController
};
