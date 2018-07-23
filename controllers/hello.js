var hello = function (data, callback) {
  let payload = (!data.payload) ? {'name': 'world'} : JSON.parse(data.payload);
  payload = typeof(payload) !== 'object' ? {'name': payload} : payload;
  payload = Array.isArray(payload) ? {'name': payload.join(', ')} : payload;
  callback(200, {
    'message': "Hello " + payload.name
  });
};

module.exports = hello;
