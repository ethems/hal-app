const request = require('supertest');

describe('App general calls', () => {
  let server;
  before(() => {
    server = require('../../index');
  });
  after((done) => {
    server.close();
    done();
  });
  describe('GET', () => {
    it('should respond 200 to  /', (done) => {
      request(server).get('/').expect(200, done);
    });
    it('should respond 200 to  /xxx', (done) => {
      request(server).get('/xxx').expect(200, done);
    });
    it('should respond 404 to  /api/xxx', (done) => {
      request(server).get('/api/xxx').expect(404, done);
    });
  });
});
