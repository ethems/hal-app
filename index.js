const express = require('express');
const logger = require('./lib/logger');

const server = express();

// ENVIRONMENT
const environmentTypes = ['production', 'development', 'test'];
const envArg = process.argv && process.argv[process.argv.length - 1];
const env = ~environmentTypes.indexOf(envArg) && envArg || 'development';
process.env.NODE_ENV = process.env.NODE_ENV || env;

// RUNTIME CONFIGIRATION
const config = require('./config')();

// DB SETUP
require('./lib/db')(config);


server.listen(config.serverPort, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`===> Listening on port ${config.serverPort} in ${process.env.NODE_ENV} mode`);
  }
});
