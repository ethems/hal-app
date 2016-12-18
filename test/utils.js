var mongoose = require('mongoose');
var test = require('../config/test');
var bluebird = require('bluebird');
// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

before(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    mongoose.connection.collections.products.insert({name: "Avokado"});
    mongoose.connection.collections.products.insert({name: "Price Fruit"});
    mongoose.connection.collections.products.insert({name: "Price Fruit2"});

    return done();
  }

  function reconnect() {
    mongoose.Promise = bluebird;
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

after((done) => {
  mongoose.disconnect();
  return done();
});
