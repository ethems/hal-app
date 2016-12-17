const should = require('should');
const Product = require('../../lib/models/product');
const co = require('co');

describe('PRODUCTS  MODEL', () => {
  describe('#Create', () => {
    it('should create a new Product', (done) => {
      const p = {
        name: 'domates'
      };
      Product.create(p).then((createdProduct) => {
        createdProduct.name.should.equal('Domates');
        done();
      });
    });
    it('should create a new Product with captilze name if name contains more than one word', (done) => {
      const p = {
        name: 'domates patlican'
      };
      Product.create(p).then((createdProduct) => {
        createdProduct.name.should.equal('Domates Patlican');
        done();
      });
    });
    it('should create a new Product with price', (done) => {
      const p = {
        name: 'domates biber patlican'
      };
      Product.create(p).then((createdProduct) => {
        return Product.updatePrice(createdProduct.id, {price: 10.34}).then((newProduct) => {
          newProduct.name.should.equal('Domates Biber Patlican');
          newProduct.priceHistory.length.should.equal(1);
          newProduct.priceHistory[0].price.should.equal(10.34);
          done();
        });
      });
    });
  });
  describe('#Find', () => {
    it('should filter productHistory by date', (done) => {
      co(function * () {
        const p = {
          name: 'Biber Domates Patlican'
        };
        const createdProduct = yield Product.create(p);
        should.exist(createdProduct);
        yield Product.updatePrice(createdProduct.id, {
          price: 30.34,
          startDate: new Date(1999, 1, 1)
        });
        yield Product.updatePrice(createdProduct.id, {
          price: 30.30,
          startDate: new Date(2001, 1, 1)
        });
        yield Product.updatePrice(createdProduct.id, {
          price: 30.28,
          startDate: new Date(2015, 1, 1)
        });
        yield Product.updatePrice(createdProduct.id, {
          price: 30.35,
          startDate: new Date(2017, 1, 1)
        });
        Product.getWithAllPricesSince(createdProduct.id, new Date()).then((foundProduct) => {
          foundProduct.priceHistory[0].price.should.equal(30.35);
          foundProduct.priceHistory.length.should.equal(1);
          done();
        });
      });
    });
  });
  describe('#Update', () => {
    it('should update productHistory', (done) => {
      co(function * () {
        const foundProduct = yield Product.findByName('avokado');
        should.exist(foundProduct);
        yield Product.updatePrice(foundProduct.id, {price: 30.34});
        yield Product.updatePrice(foundProduct.id, {price: 30.30});
        yield Product.updatePrice(foundProduct.id, {price: 30.28});
        const res4 = yield Product.updatePrice(foundProduct.id, {price: 30.35});
        res4.priceHistory[0].price.should.equal(30.35);
        res4.priceHistory.length.should.equal(1);
        done();
      })
    });

    it('should add new price to productHistory', (done) => {
      const p = {
        name: 'Domates biber patlican sogan 2',
        priceHistory: []
      };
      Product.create(p).then(function(createdProduct) {
        return Product.updatePrice(createdProduct.id, {price: 10.35});
      }).then(function(updatedProduct) {
        updatedProduct.priceHistory.length.should.equal(1);
        updatedProduct.priceHistory[0].price.should.equal(10.35);
        done();
      });
    });
  });
});
