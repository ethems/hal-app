const should = require('should');
const Price = require('../../lib/models/price');
const Product = require('../../lib/models/product');
const co = require('co');
const moment = require('moment');

describe('PRICE  MODEL', () => {
  describe('#Find', () => {
    it('should get price', (done) => {
      co(function * () {
        const p = {
          name: 'Price find test1'
        };
        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {price: 10.34});
        yield Product.updatePrice(product.id, {
          price: 10.36,
          startDate: new Date(1999, 1, 1)
        });
        yield Product.updatePrice(product.id, {price: 10.35});
        const prices = yield Price.getAllSince(product.id, new Date(2000, 1, 1));
        prices.length.should.equal(2);
        done();
      });
    });
    it('FOR PRICE TIMELINE', (done) => {
      co(function * () {
        const p = {
          name: 'TIMLINE PRICE TEST'
        };

        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {
          price: 10.34,
          startDate: moment().startOf('day').add(1, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.36,
          startDate: moment().startOf('day').add(2, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('day').add(3, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('day').add(4, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.30,
          startDate: moment().startOf('day').add(5, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.29,
          startDate: moment().startOf('day').add(6, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.21,
          startDate: moment().startOf('day').add(7, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.55,
          startDate: moment().startOf('day').add(8, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 11,
          startDate: moment().startOf('day').add(9, 'hours')
        });
        done();
      });
    });
    it('FOR PRICE TIMELINE WEEKLY', (done) => {
      co(function * () {
        const p = {
          name: 'TIMLINE PRICE TEST WEEKLY'
        };

        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {
          price: 10.34,
          startDate: moment().startOf('week').add(1, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.36,
          startDate: moment().startOf('week').add(2, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('week').add(3, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('week').add(4, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.30,
          startDate: moment().startOf('day').add(5, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.29,
          startDate: moment().startOf('day').add(6, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.21,
          startDate: moment().startOf('day').add(7, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.55,
          startDate: moment().startOf('day').add(8, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 11,
          startDate: moment().startOf('day').add(9, 'hours')
        });
        done();
      });
    });
    it('FOR PRICE TIMELINE MONTHLY', (done) => {
      co(function * () {
        const p = {
          name: 'TIMLINE PRICE TEST MONTHLY'
        };

        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {
          price: 10.34,
          startDate: moment().startOf('month').add(1, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 33,
          startDate: moment().startOf('month').add(1, 'weeks')
        });
        yield Product.updatePrice(product.id, {
          price: 44,
          startDate: moment().startOf('month').add(2, 'weeks')
        });
        yield Product.updatePrice(product.id, {
          price: 55,
          startDate: moment().startOf('month').add(3, 'weeks')
        });
        yield Product.updatePrice(product.id, {
          price: 10.36,
          startDate: moment().startOf('week').add(2, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('week').add(3, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.35,
          startDate: moment().startOf('week').add(4, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.30,
          startDate: moment().startOf('day').add(5, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.29,
          startDate: moment().startOf('day').add(6, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.21,
          startDate: moment().startOf('day').add(7, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 10.55,
          startDate: moment().startOf('day').add(8, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 11,
          startDate: moment().startOf('day').add(9, 'hours')
        });
        done();
      });
    });
    it('should get price with active and close price when they are entered all price current day', (done) => {
      co(function * () {
        const p = {
          name: 'Price find test2'
        };
        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {price: 10.34});
        yield Product.updatePrice(product.id, {price: 10.35});
        yield Product.updatePrice(product.id, {price: 10.36});
        const foundPrice = yield Price.getPreviousDayClosePrice(product.id, moment().startOf('day'));
        foundPrice.length.should.equal(0);
        done();
      });
    });
    it('should get price with active and close price when when the are entered different day', (done) => {
      co(function * () {
        const p = {
          name: 'Price find test3'
        };
        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {
          price: 99.99,
          startDate: moment().startOf('month').add(1, 'hours')
        });
        yield Product.updatePrice(product.id, {price: 10.35});
        yield Product.updatePrice(product.id, {price: 10.36});
        const foundPrice = yield Price.getPreviousDayClosePrice(product.id, moment().startOf('day'));
        foundPrice.length.should.equal(1);
        done();
      });
    });
    it('should get price with active and close price when when the are entered different day 2', (done) => {
      co(function * () {
        const p = {
          name: 'Price find test4'
        };
        const product = yield Product.create(p);
        should.exist(product);
        yield Product.updatePrice(product.id, {
          price: 99.99,
          startDate: moment().startOf('month').add(1, 'hours')
        });
        yield Product.updatePrice(product.id, {
          price: 100,
          startDate: moment().startOf('month').add(2, 'hours')
        });
        yield Product.updatePrice(product.id, {price: 10.35});
        yield Product.updatePrice(product.id, {price: 10.36});
        const foundPrice = yield Price.getPreviousDayClosePrice(product.id, moment().startOf('day'));
        foundPrice.length.should.equal(1);
        foundPrice[0].price.should.equal(100);
        done();
      });
    });
  });
  describe('#Create', () => {
    it('should create a new Price', (done) => {
      co(function * () {
        const product = yield Product.findByName('Price Fruit');
        should.exist(product);
        const pr = {
          price: 20.33,
          productId: product.id
        };
        Price.create(pr).then((createdPrice) => {
          createdPrice.price.should.equal(20.33);
          done();
        });
      });
    });
  });
  describe('#Update', () => {
    it('should update prices', (done) => {
      co(function * () {
        const product = yield Product.findByName('Price Fruit2');
        should.exist(product);
        const pricePr1 = Price.create({price: 20.33, productId: product.id});
        const pricePr2 = Price.create({price: 20.34, productId: product.id});
        const [pr1,
          pr2] = yield[pricePr1,
          pricePr2];

        yield Price.expirePrice(product.id);

        const [updatedPrice1,
          updatedPrice2] = yield[Price.findById(pr1.id).exec(),
          Price.findById(pr2.id).exec()];

        updatedPrice1.active.should.equal(false);
        updatedPrice2.active.should.equal(true);
        done();
      });
    });
  });
});
