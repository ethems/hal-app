var mongoose = require('mongoose');
var test = require('../config/test');
// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    mongoose.connection.collections.products.insert({name: "Avokado"});
    return done();
  }

  function reconnect() {
    mongoose.connect(test.dbUri, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }

  function checkState() {
    switch (mongoose.connection.readyState) {
      case 0:
        reconnect();
        break;
      case 1:
        clearDB();
        break;
      default:
        process.nextTick(checkState);
    }
  }

  checkState();

});

after(function(done) {
  mongoose.disconnect();
  return done();
});
