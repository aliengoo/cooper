(function () {
  'use strict';

  var Q = require('q');
  var tokenRepository = require('../data/repositories/tokenRepository')();

  module.exports = function () {
    var exports = {
      isValid: isValid
    };

    return exports;

    function isValid(token) {
      var defer = Q.defer();

      tokenRepository.findByToken(token).then(function() {
        if (token && !token.revoked) {
          defer.resolve();
        } else {
          defer.reject();
        }
      }, function() {
          defer.reject();
      });

      return defer.promise;
    }
  };

}());
