const should = require('should');
const Product = require('../../lib/models/product');
const Price = require('../../lib/models/price');

describe('PRODUCTS  MODEL', () => {
  describe('#Create', () => {
    it('should create a new Product', (done) => {
      const p = {
        name: 'domates'
      };
      Product.create(p, (err, createdProduct) => {
        should.not.exist(err);
        createdProduct.name.should.equal('Domates');
        done();
      });
    });
    it('should create a new Product with captilze name if name contains more than one word', (done) => {
      const p = {
        name: 'domates patlican'
      };
      Product.create(p, (err, createdProduct) => {
        should.not.exist(err);
        createdProduct.name.should.equal('Domates Patlican');
        done();
      });
    });
    it('should create a new Product with price', (done) => {
      const p = {
        name: 'domates biber patlican'
      };
      Product.create(p, (err, createdProduct) => {
        should.not.exist(err);
        Product.updatePrice(createdProduct.id, {
          price: 10.34
        }, (err, newProduct) => {
          should.not.exist(err);
          newProduct.name.should.equal('Domates Biber Patlican');
          newProduct.priceHistory.length.should.equal(1);
          newProduct.priceHistory[0].price.should.equal(10.34);

          done();
        });
      });
    });
  });
});
