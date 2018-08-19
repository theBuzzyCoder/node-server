const url = require('url');
const router = require('./controllers');
const helpers = require('./lib/helpers');

var processRequest = function (req, res) {
  let parsedUrl = url.parse(req.url, true);
  let path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  let query_string = parsedUrl.query;
  let method = req.method.toLowerCase();
  let headers = req.headers;
  let StringDecoder = require('string_decoder').StringDecoder;
  let decoder = new StringDecoder('utf-8');
  let buffer = "";

  req.on('data', function (data) {
    buffer += decoder.write(data)
  });

  req.on('end', function () {
    buffer += decoder.end();

    var data = {
      'trimmedPath': trimmedPath,
      'headers': headers,
      'method': method,
      'payload': helpers.parseJsonToObject(buffer),
      'query_string': query_string
    }

    if (trimmedPath.startsWith('api/v1/')) {
      trimmedPath = trimmedPath.replace(/api\/v1\//g, '');
      var chosenAPI = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound;
    } else {
      var chosenAPI = router.notFound;
    }

    chosenAPI(data, function (statusCode, payLoad) {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
      payLoad = typeof(payLoad) === 'object' ? payLoad : {};
      payLoad = JSON.stringify(payLoad);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payLoad);
    });
  });
};

module.exports = processRequest;
