const path = require('path');

// Dependencies
const userLib = require(path.join(__dirname, '..', 'lib', 'users'));

var _users = {};

_users.__fetchStringField = function (data, fieldName) {
  if (typeof(data[fieldName]) == 'string') {
    return data[fieldName].trim();
  } else {
    return '';
  }
};

_users.__getData = function (data) {
  trimmedData = {};
  for (var variable in data) {
    if (typeof(data[variable]) == 'string') {
      trimmedData[variable] = _users.__fetchStringField(data, variable);
    } else {
      trimmedData[variable] = data[variable];
    }
  }
  return trimmedData;
};

_users.__hasRequiredFields = function (data) {
  // Check for all the required fields
  let firstName = data.firstName.length > 0 ? true : false;
  let lastName = data.lastName.length > 0 ? true : false;
  let phone = data.phone.length == 10 ? true : false;
  let password = data.password.length > 0 ? true : false;
  let tosAgreement = (typeof(data.tosAgreement) == 'boolean') && data.tosAgreement ? true : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    return true;
  }
  return false;
};

_users.__hasAtLeastOne = function (data) {
  // Check for all the required fields
  let firstName = data.firstName && data.firstName.length > 0 ? true : false;
  let lastName = data.lastName && data.lastName.length > 0 ? true : false;
  let password = data.password && data.password.length > 0 ? true : false;

  if (firstName || lastName || password) {
    return true;
  }
  return false;
}

_users.post = function (data, callback) {
  userData = _users.__getData(data.payload);
  if (!_users.__hasRequiredFields(userData)) {
    callback(400, {"Error": "Missing required fields!"});
  }
  userName = userData.phone;
  userLib.create(userName, userData, function (err) {
    if (err) {
      if (err == "User Exists") {
        callback(400, {"Error": "User with username: " + userName + " already exists!"});
      } else {
        callback(500, err);
      }
    } else {
      callback(200, {"Success": "User Created!"});
    }
  });
};


// @TODO: Only let authenticated users access their object.
_users.get = function (data, callback) {
  userData = _users.__getData(data.query_string);
  userName = userData.phone && userData.phone.length == 10 ? userData.phone : false;
  if (userName) {
    userLib.get(userName, function (err, storedData) {
      if (err) {
        callback(404, {"Error" :err});
      } else {
        // Remove the hashed password.
        delete storedData.password;
        callback(200, storedData);
      }
    });
  } else {
    callback(400, {"Error": "Missing Required Field"});
  }
};


// Required: phone
// Optional: firstName, lastName, password (at least one should be present)
// @TODO: Only let authenticated users update their object.
_users.put = function (data, callback) {
  userData = _users.__getData(data.payload);
  userName = userData.phone && userData.phone.length == 10 ? userData.phone : false;
  if (!userName) {
    callback(400, {
      "Error": "username not given!"
    });
    return;
  }

  if (!_users.__hasAtLeastOne(userData)) {
    callback(400, {
      "Error": "at least one field is needed to update!"
    });
    return;
  }

  delete userData.phone;
  userLib.update(userName, userData, function (err) {
    if (err) {
      callback(500, {"Error": err});
    } else {
      callback(200, {"Success": "User Updated!"});
    }
  });
};

_users.delete = function (data, callback) {
  userData = _users.__getData(data.query_string);
  userName = userData.phone && userData.phone.length == 10 ? userData.phone : false;
  if (userName) {
    userLib.delete(userName, function (err) {
      if (err) {
        callback(500, {"Error": err});
      } else {
        callback(200, {});
      }
    });
  } else {
    callback(400, {"Error": "Missing Required Field"});
  }
};

var users = function (data, callback) {
  let acceptable = ['post', 'get', 'put', 'delete'];
  if (acceptable.indexOf(data.method) > -1) {
    _users[data.method](data, callback);
  } else {
    callback(405, {"Error": "Method not allowed!"});
  }
};

module.exports = users;
