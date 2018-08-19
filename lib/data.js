const fs = require('fs');
const path = require('path');

var lib = {};
lib.baseDir = path.join(__dirname, '..', '.data');

function getFilePathWithExt(dir, file) {
  jsonFile = file + '.json';
  return path.join(lib.baseDir, dir, jsonFile);
}

function fileWrite(fileDescriptor, data, errorMessage, callback) {
  var stringData = JSON.stringify(data, null, 4);
  fs.writeFile(fileDescriptor, stringData, function (err) {
      if (!err) {
          fs.close(fileDescriptor, function (err) {
              if (!err) {
                  callback(false);
              } else {
                  callback("Couldn't close the file opened");
              }
          });
      } else {
          callback(errorMessage);
      }
  });
}

lib.create = function (dir, file, data, callback) {
    jsonFile = getFilePathWithExt(dir, file);
    fs.open(jsonFile, "wx", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            fileWrite(fileDescriptor, data, "Write Failed!", callback);
        } else {
            callback("File already exists");
        }
    });
};


lib.read = function (dir, file, callback) {
    jsonFile = getFilePathWithExt(dir, file);
    fs.readFile(jsonFile, 'utf-8', function (err, data) {
      if (!err && data) {
        let parsedData = helpers.parseJsonToObject(data);
        callback(err, parsedData);
      } else {
        callback(err, data);
      }
    });
}

lib.update = function (dir, file, data, callback) {
    jsonFile = getFilePathWithExt(dir, file);
    // r+ throws error only when file doesn't exist.
    fs.open(jsonFile, "r+", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            fs.truncate(jsonFile, function (err) {
              if (err) {
                callback("Couldn't truncate the file");
              } else {
                fileWrite(fileDescriptor, data, "Update Failed!", callback);
              }
            });
        } else {
            callback("Couldn't open the file for updating! It may not exist");
        }
    });
};

lib.delete = function (dir, file, callback) {
  jsonFile = getFilePathWithExt(dir, file);
  fs.unlink(jsonFile, function (err) {
    callback(err);
  });
};


module.exports = lib;
