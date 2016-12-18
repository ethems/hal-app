const should = require('should');
const Price = require('../../lib/models/price');
const Product = require('../../lib/models/product');
const co = require('co');

describe('PRICE  MODEL', () => {
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
