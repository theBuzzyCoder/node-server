const http = require('http');
const https = require('https');
const fs = require('fs');

const config = require('./config');
const processRequest = require('./processor');

var httpServer = http.createServer(function (req, res) {
  console.log("Received Request in http!");
  processRequest(req, res);
});

httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  console.log("Received Request in https!");
  processRequest(req, res);
});

httpServer.listen(config.port.http, function () {
  console.log("This server is listening on " + config.port.http + " now in env: " + config.envName)
});

httpsServer.listen(config.port.https, function () {
  console.log("This server is listening on " + config.port.https + " now in env: " + config.envName)
});
