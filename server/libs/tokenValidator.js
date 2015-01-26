(function () {
  'use strict';

  var Q = require('q');
  var Token = require('./token').Token;

  module.exports = function () {
    var exports = {
      isValid: isValid
    };

    return exports;

    function isValid(token) {
      var defer = Q.defer();

      Token.findByToken(token, function (err, token) {
        if (err) {
          defer.reject();
        } else {
          if (token && !token.revoked) {
            defer.resolve();
          } else {
            defer.reject();
          }
        }
      });

      return defer.promise;
    }
  };

}());
