const mongoose = require('mongoose');
const units = require('./price-units');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: units,
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
    required: true
  },
  endDate: Date,
  active: {
    type: Boolean,
    default: true
  }
});
priceSchema.pre('validate', function(next) {
  if (!this.startDate) {
    this.startDate = Date.now();
  }
  next();
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
priceSchema.statics.getAllSince = function(productId, date) {
  // Get all prices since specific date and with active one
  return this.find({
    $and: [
      {
        productId
      }, {
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
    ]
  }).exec();
};

priceSchema.statics.getPreviousDayClosePrice = function(productId, date) {
  return this.find({
    $and: [
      {
        productId
      }, {
        startDate: {
          $lt: date
        }
      }, {
        active: false
      }
    ]
  }).sort({startDate: -1}).limit(1).exec();
}

const PriceModel = mongoose.model('Price', priceSchema);

module.exports = PriceModel;
