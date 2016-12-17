const mongoose = require('mongoose');
const priceTypes = require('./price-types');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: priceTypes,
    default: 'Kasa'
  },
  currency: {
    type: String,
    default: 'TRY'
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: Date,
  active: {
    type: Boolean,
    default: true
  }
});

priceSchema.statics.expirePrice = function(productId) {
  return this.update({
    productId,
    active: true
  }, {
    $set: {
      active: false,
      endDate: Date.now()
    }
  }).exec();
};

const PriceModel = mongoose.model('Price', priceSchema);

module.exports = PriceModel;
