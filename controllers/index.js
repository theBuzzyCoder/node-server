const ping = require('./ping');
const hello = require('./hello');
const notFound = require('./notFound');

var routes = {
  'ping': ping,
  'hello': hello,
  'notFound': notFound
};

module.exports = routes;
