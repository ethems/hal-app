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
productSchema.statics.findByName = function(productName) {
  return this.findOne({name: capitalize(productName)}).exec();
};

productSchema.statics.getWithAllPricesSince = function(productId, date) {
  // Get History since specific date and with active one
  return this.findById(productId).populate({
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
  }).exec();
};

productSchema.statics.getWithLastNPrices = function(productId, limit) {
  let limitTmp = limit;
  if (!isNaN(limit)) {
    limitTmp = 1;
  }
  return this.findById(productId).populate({
    path: 'priceHistory',
    options: {
      limit: limitTmp,
      sort: {
        startDate: -1
      }
    }
  }).exec();
};

productSchema.statics.expireActivePrice = function(productId) {
  return Price.expirePrice(productId);
};
productSchema.statics.addNewPrice = function(productId, newPrice) {
  const price = new Price(_.extend({
    productId
  }, newPrice));
  return price.save();
};
productSchema.statics.addPriceHistory = function(productId, priceId) {
  return this.update({
    _id: productId
  }, {
    $push: {
      priceHistory: priceId
    }
  }).exec();
};
productSchema.statics.updatePrice = function(productId, newPrice) {
  const that = this;
  return this.expireActivePrice(productId).then(() => {
    return that.addNewPrice(productId, newPrice);
  }).then((price) => {
    return that.addPriceHistory(productId, price.id);
  }).then(() => {
    return that.getWithActivePrice(productId);
  })
};
productSchema.statics.getWithActivePrice = function(productId) {
  //  Return selected product with active price
  return this.findById(productId).populate({
    path: 'priceHistory',
    match: {
      active: true
    }
  }).exec();
};
productSchema.statics.getAllWithActivePrice = function() {
  //  Return all products with active price
  return this.find().populate({
    path: 'priceHistory',
    match: {
      active: true
    }
  }).exec();
};

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
