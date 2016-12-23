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
    it('should create new product', (done) => {
      const product = {
        name: 'product put test'
      };
      request(server).put('/api/product').send(product).expect(200).end((err, res) => {
        should.not.exists(err);
        res.body.product.name.should.equal('Product Put Test');
        done();
      });
    });
    it('should respond 500 if there is already a product with same name', (done) => {
      const product = {
        name: 'product put test'
      };
      request(server).put('/api/product').send(product).expect(500, done);
    });
    it('should update a product', (done) => {
      co(function * () {
        const product = {
          name: 'product put test 2'
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