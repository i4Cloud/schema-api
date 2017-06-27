'use strict';

var schemasAPI = require('./src/');
var logger = require('./src/logger/logger');

schemasAPI.deploy().then((solution) => {
    logger.info("Start hacking!");
}, (err) => {
    logger.error(err);
});