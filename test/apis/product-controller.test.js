const request = require('supertest');
const Product = require('../../lib/models/product');
const co = require('co');
const should = require('should');

describe('Product Controller', () => {
  let server;
  before(() => {
    server = require('../../index');
  });
  after((done) => {
    server.close();
    done();
  });
  describe('PUT', () => {
    it('should create new product with just name', (done) => {
      const product = {
        name: 'product put test just name'
      };
      request(server).put('/api/product').send(product).expect(200).end((err, res) => {
        should.not.exists(err);
        res.body.product.name.should.equal('Product Put Test Just Name');
        res.body.product.active.should.equal(true);
        done();
      });
    });
    it('should create new product with just name and newPrice', (done) => {
      const product = {
        name: 'product put test just name and price',
        newPrice: {
          price: 123
        }
      };
      request(server).put('/api/product').send(product).expect(200).end((err, res) => {
        should.not.exists(err);
        res.body.product.name.should.equal('Product Put Test Just Name And Price');
        res.body.product.active.should.equal(true);
        res.body.product.priceHistory.length.should.equal(1);
        res.body.product.priceHistory[0].price.should.equal(123);
        done();
      });
    });
    it('should create new product', (done) => {
      const product = {
        name: 'product put test',
        active: true
      };
      request(server).put('/api/product').send(product).expect(200).end((err, res) => {
        should.not.exists(err);
        res.body.product.name.should.equal('Product Put Test');
        done();
      });
    });
    it('should respond 500 if there is already a product with same name', (done) => {
      const product = {
        name: 'product put test',
        active: true
      };
      request(server).put('/api/product').send(product).expect(500, done);
    });
    it('should update a product', (done) => {
      co(function * () {
        const product = {
          name: 'product put test 2',
          active: true
        };
        const productCreated = yield Product.create(product);
        productCreated.name = 'product put test 2 updated';
        request(server).put('/api/product').send(productCreated).expect(200).end((err, res) => {
          should.not.exists(err);
          res.body.product.name.should.equal('Product Put Test 2 Updated');
          done();
        });
      });
    });
    it('should  update product active state ', (done) => {
      co(function * () {
        const product = {
          name: 'product put test 2 for state',
          active: true
        };
        const productCreated = yield Product.create(product);
        productCreated.active = false;
        request(server).put('/api/product').send(productCreated).expect(200).end((err, res) => {
          should.not.exists(err);
          res.body.product.active.should.equal(false);
          done();
        });
      });
    });
    it('should  update product price ', (done) => {
      co(function * () {
        const product = {
          name: 'product put test 2 for price',
          active: false
        };
        let productCreated = yield Product.create(product);
        const updateProduct = {
          id: productCreated.id,
          active: false,
          name: productCreated.name,
          newPrice: {
            price: 234
          }
        };
        request(server).put('/api/product').send(updateProduct).expect(200).end((err, res) => {
          should.not.exists(err);
          res.body.product.priceHistory.length.should.equal(1);
          res.body.product.priceHistory[0].price.should.equal(234);
          res.body.product.active.should.equal(false);
          done();
        });
      });
    });
    it('should not update product price with same unit and price', (done) => {
      co(function * () {
        const product = {
          name: 'product put test 3 for price',
          active: false
        };
        const productCreated = yield Product.create(product);
        const updateProduct = {
          id: productCreated.id,
          active: false,
          name: productCreated.name,
          newPrice: {
            price: 234567
          }
        };
        request(server).put('/api/product').send(updateProduct).expect(200).end((err, res) => {
          should.not.exists(err);
          const product = res.body.product;
          product.newPrice = res.body.product.priceHistory[0];
          request(server).put('/api/product').send(product).expect(200).end((err, res) => {
              Product.findById(productCreated.id,(err,product)=>{
              product.priceHistory.length.should.equal(1);
              done();
            });
          });
        });
      });
    });
  });
  describe('DELETE', () => {
    it('should delete product', (done) => {
      co(function * () {
        const product = {
          name: 'product delete test'
        };
        const createdProduct = yield Product.create(product);
        yield Product.updatePrice(createdProduct.id, {price: 30.34});
        request(server).delete(`/api/products/${createdProduct.id}`).expect(200).end((err, res) => {
          should.not.exists(err);
          res.body.product.isDeleted.should.equal(true);
          done();
        });
      });
    });
  });
  describe('POST', () => {
    it('should update price', (done) => {
      co(function * () {
        const product = {
          name: 'product post test'
        };
        const productCreated = yield Product.create(product);
        const price = {
          price: 23.75
        };
        request(server).post(`/api/products/${productCreated.id}/price`).send(price).expect(200).end((err, res) => {
          const priceHistory = res.body.product.priceHistory;
          priceHistory.length.should.equal(1);
          priceHistory[0].price.should.equal(23.75);
          done();
        });
      });
    });
  });
  describe('GET', () => {
    it('should response 200 to /api/products?withrate=true',(done)=>{
      request(server).get('/api/products?withrate=true').expect(200, done);
    });
    it('should respond 200 to  /api/products', (done) => {
      request(server).get('/api/products').expect(200, done);
    });
    it('should respond 500 to  /api/products/xxx', (done) => {
      request(server).get('/api/products/xxx').expect(500, done);
    });
    it('should respond 200 to /api/products/:id', (done) => {
      co(function * () {
        const foundProduct = yield Product.findByName('avokado');
        request(server).get(`/api/products/${foundProduct.id}`).expect(200, done);
      });
    });
    it('should respond 200 to /api/products/:id/:timespan', (done) => {
      co(function * () {
        const foundProduct = yield Product.findByName('avokado');
        request(server).get(`/api/products/${foundProduct.id}/daily`).expect(200, done);
      });
    });
  });
});
