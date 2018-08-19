const dataLib = require('./data');
const helpers = require('./helpers');
var _users = {};


_users.get = function (username, callback) {
  dataLib.read('users', username, function (err, data) {
    if (err) {
      callback("User doesn't exists", false);
    } else {
      callback(err, data);
    }
  });
};

_users.create = function (username, data, callback) {
  // Make sure user doesn't already exists.
  _users.get(username, function (err, storedData) {
    if (!storedData) {
      var hashedPassword = helpers.hash(data.password);
      if (hashedPassword) {
        data.password = hashedPassword;
        dataLib.create('users', username, data, function (err) {
          callback(err);
        });
      } else {
        callback("Couldn't hash the user's password");
      }
    } else {
      callback("User Exists");
    }
  });
};

_users.update = function (username, data, callback) {
  if (!data) {
    callback("Nothing to update! Phone number update not allowed.")
  }

  _users.get(username, function (err, storedData) {
    if (storedData) {
      toUpdate = {};
      for (var variable in storedData) {
        if (typeof data[variable] != 'undefined') {
          if (variable == 'password') {
            toUpdate[variable] = helpers.hash(data[variable]);
            continue;
          }
          toUpdate[variable] = data[variable];
        } else {
          toUpdate[variable] = storedData[variable];
        }
      }
      dataLib.update('users', username, toUpdate, function (err) {
        callback(err);
      });
    } else {
      callback("User not found!");
    }
  });
}

_users.delete = function (username, callback) {
  dataLib.delete('users', username, function (err) {
    callback(err);
  });
}

module.exports = _users;
