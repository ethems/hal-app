const mongoose = require('mongoose');
const _ = require('lodash');
const Price = require('./price');

const Schema = mongoose.Schema;
const capitalize = (val) => {
  if (!val) {
    return '';
  }
  return val.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
};

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    set: capitalize,
    unique: true
  },
  priceHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Price'
    }
  ],
  createdDate: {
    type: Date,
    default: Date.now()
  },
  active: {
    type: Boolean,
    default: true
  },
  modifiedDate: Date
});

productSchema.pre('save', function(next) {
  this.modifiedDate = Date.now();
  next();
});
productSchema.statics.findByName = function(productName, fn) {
  this.findOne({
    name: capitalize(productName)
  }, fn);
};

productSchema.statics.getWithAllPricesSince = function(productId, date, fn) {
  // Get History since specific date with active one
  this.findById(productId).populate({
    path: 'priceHistory',
    match: {
      $or: [
        {
          startDate: {
            $gte: date
          }
        }, {
          active: true
        }
      ]
    }
  }).exec(fn);
};

productSchema.statics.getWithLastNPrices = function(productId, limit, fn) {
  let limitTmp = limit;
  if (!isNaN(limit)) {
    limitTmp = 1;
  }
  this.findById(productId).populate({
    path: 'priceHistory',
    options: {
      limit: limitTmp,
      sort: {
        startDate: -1
      }
    }
  }).exec(fn);
};

productSchema.statics.expireActivePrice = function(productId, fn) {
  Price.expirePrice(productId, fn);
};
productSchema.statics.addNewPrice = function(productId, newPrice, fn) {
  const price = new Price(_.extend({
    productId
  }, newPrice));
  price.save(fn);
};
productSchema.statics.addPriceHistory = function(productId, priceId, fn) {
  this.update({
    _id: productId
  }, {
    $push: {
      priceHistory: priceId
    }
  }, fn);
};
productSchema.statics.getWithActivePrice = function(productId, fn) {
  //  Return selected product with active price

  this.findById(productId).populate({
    path: 'priceHistory',
    match: {
      active: true
    }
  }).exec(fn);
};
productSchema.statics.updatePrice = function(productId, newPrice, fn) {
  const that = this;
  this.expireActivePrice(productId, function(err, doc, next) {
    if (err) {
      return next(err);
    }
    that.addNewPrice(productId, newPrice, function(err, price, next) {
      if (err) {
        return next(err);
      }
      that.addPriceHistory(productId, price.id, function(err, doc, next) {
        if (err) {
          return next(err);
        }
        that.getWithActivePrice(productId, fn);
      });
    });
  });
};
productSchema.statics.getAllWithActivePrice = function(fn) {
  //  Return all products with active price
  this.find().populate({
    path: 'priceHistory',
    match: {
      active: true
    }
  }).exec(fn);
};

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
