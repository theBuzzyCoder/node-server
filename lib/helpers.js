/**
 * Helpers for various tasks.
 */

const crypto = require('crypto');
const config = require('../config');

helpers = {};

helpers.hash = function (password) {
  if (typeof(password) == 'string' && password.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(password).digest('hex');
    return hash;
  } else {
    return false;
  }
}

helpers.parseJsonToObject = function (str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

module.exports = helpers;
