const fs = require('fs');
const path = require('path');

var lib = {};
lib.baseDir = path.join(__dirname, '..', '.data');

function getFilePathWithExt(dir, file) {
  jsonFile = file + '.json';
  path.join(lib.baseDir, dir, jsonFile)
}

function fileWrite(fileDescriptor, stringData, errorMessage, callback) {
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
            var string = JSON.stringify(data);
            fileWrite(fileDescriptor, string, "Write Failed!", callback);
        } else {
            callback("File already exists");
        }
    });
}


lib.read = function (dir, file, callback) {
    jsonFile = getFilePathWithExt(dir, file);
    fs.readFile(jsonFile, 'utf-8', function (err, data) {
        callback(err, data);
    });
}

lib.update = function (dir, file, data, callback) {
    jsonFile = getFilePathWithExt(dir, file);
    // r+ throws error only when file doesn't exist.
    fs.open(jsonFile, "r+", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var string = JSON.stringify(data);
            fs.truncate(jsonFile, function (err) {
              if (err) {
                callback("Couldn't truncate the file");
              } else {
                fileWrite(fileDescriptor, string, "Update Failed!", callback);
              }
            });
        } else {
            callback("Couldn't open the file for updating! It may not exist");
        }
    });
}

lib.delete = function (dir, file, callback) {
  jsonFile = getFilePathWithExt(dir, file);
  fs.unlink(jsonFile, function (err) {
    if (err) {
      callback("Failed to delete the file");
    } else {
      callback(false);
    }
  });
}


module.exports = lib;
