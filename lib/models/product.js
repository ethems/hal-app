const mongoose = require('mongoose');
const _ = require('lodash');
const Price = require('./price');
const co = require('co');

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
    validate: {
      validator: function(v, cb) {
        const that = this;
        ProductModel.find({
          name: capitalize(v),
          isDeleted: false
        }, (err, docs) => {
          cb(Array.isArray(docs) && docs.filter(doc => !doc._id.equals(that._id)).length === 0);
        });
      },
      message: 'Product name shoud be unique!'
    }
  },
  priceHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Price'
    }
  ],
  createdDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  modifiedDate: Date
});

productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
productSchema.set('toJSON', {virtuals: true});
productSchema.set('toObject', {virtuals: true});
productSchema.pre('validate', function(next) {
  if (!this.createdDate) {
    this.createdDate = Date.now();
  }
  next();
});
productSchema.pre('save', function(next) {
  this.modifiedDate = Date.now();
  next();
});
productSchema.pre('remove', function(next) {
  Price.remove({productId: this.id}).exec();
  next();
});
productSchema.statics.softDelete = function(productId) {
  const promise = this.update({
    _id: productId
  }, {
    $set: {
      isDeleted: true,
      priceHistory: []
    }
  }).exec();
  return promise.then(() => Price.remove({productId}).exec()).then(() => this.findById(productId).exec());
};
productSchema.statics.findByName = function(productName) {
  return this.findOne({name: capitalize(productName), isDeleted: false}).exec();
};
productSchema.statics.getWithAllPrice = function(productId) {
  return this.findById(productId).populate({path: 'priceHistory'}).exec();
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
  const priceTemp = _.extend({
    productId
  }, newPrice);
  const price = new Price(priceTemp);
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
productSchema.statics.duplicate = function(productId) {
  const that = this;
  return co(function * () {
    const productWithAllPrices = yield that.getWithAllPrice(productId);
    const product = {
      name: `${productWithAllPrices.name}(dup*)`,
      active: false
    };
    const cProduct = yield that.create(product);
    const newProductId = cProduct._id;
    for (let i = 0, len = productWithAllPrices.priceHistory.length; i < len; i++) {
      const price = yield that.addNewPrice(newProductId, _.pick(productWithAllPrices.priceHistory[i], 'price', 'unit', 'currency', 'startDate', 'endDate', 'active'));
      yield that.addPriceHistory(newProductId, price._id)
    }
    return yield that.getWithActivePrice(newProductId);
  });
}
productSchema.statics.updatePrice = function(productId, newPrice) {
  const that = this;
  return this.expireActivePrice(productId).then(() => that.addNewPrice(productId, newPrice)).then(price => that.addPriceHistory(productId, price.id)).then(() => that.getWithActivePrice(productId));
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
productSchema.statics.getAllWithActivePrice = function(justActive) {
  //  Return all products with active price

  if (justActive) {
    const that=this;
    return co(function * () {
      const products = yield that.find({isDeleted: false, active: true}).populate({
        path: 'priceHistory',
        match: {
          $and: [
            {
              price: {
                $gt: 0
              }
            }, {
              active: true
            }
          ]
        }
      }).exec();
      return products.filter(product => product.priceHistory.length > 0);
    });
  }
  return this.find({isDeleted: false}).populate({
    path: 'priceHistory',
    match: {
      active: true
    }
  }).exec();
};

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
