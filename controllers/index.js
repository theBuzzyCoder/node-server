const ping = require('./ping');
const hello = require('./hello');
const notFound = require('./notFound');
const users = require('./users');

var routes = {
  'ping': ping,
  'hello': hello,
  'notFound': notFound,
  'users': users
};

module.exports = routes;
