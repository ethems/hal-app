const Mongoose = require('mongoose');
const logger = require('./logger');
const bluebird = require('bluebird');

module.exports = (config) => {
  Mongoose.Promise = bluebird;
  Mongoose.connect(config.dbUri);
  Mongoose.connection.on('error', (error) => {
    logger.console.error('MongoDB Error: ', error);
  });

  process.on('SIGINT', () => {
    Mongoose.connection.close(() => {
      logger.info('Mongoose disconnected through app terminal');
      process.exit(0);
    });
  });

  return Mongoose;
}
