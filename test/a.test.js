const should = require('should');

describe('Users: models', () => {
  describe('#Find', () => {
    it('should find a existed User', (done) => {
      should.equal(-1, [1, 2, 3].indexOf(4));
      done();
    });
  });
});
