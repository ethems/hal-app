const request = require('supertest');
const Product = require('../../lib/models/product');
const co = require('co');

describe('Product Controller', () => {
  let server;
  before(() => {
    server = require('../../index');
  });
  after((done) => {
    server.close();
    done();
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
