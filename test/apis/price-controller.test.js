const request = require('supertest');

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
    it('should respond 200 to  /api/price/units', (done) => {
      request(server).get('/api/price/units').expect(200, done);
    });
  });
});
