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
    it('should respond 200 to  /api/prices/units', (done) => {
      request(server).get('/api/prices/units').expect(200, done);
    });
  });
});
