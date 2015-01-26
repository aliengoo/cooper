(function () {
  'use strict';

  var Token = require('../models/token').Token;
  var Q = require('q');

  module.exports = function() {
    var exports = {
      findByToken : findByToken,
      revokePrevious : revokePrevious,
      findActiveTokens : findActiveTokens
    };

    return exports;

    /**
     * Finds a token document by token
     * @param token
     * @returns {*}
     */
    function findByToken(token) {
      var defer = Q.defer();

      Token.findOne({
        token : token
      }), function(err, token) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(token);
        }
      };

      return defer.promise;
    }

    /**
     * Revoke previous tokens for the user
     * @param username
     * @returns {*}
     */
    function revokePrevious(username) {
      var defer = Q.defer();

      var query = {
        username: username
      };

      var update = {
        $set : {
          revoked : true
        }
      };

      var options = {
        multi : true,
        upsert : false
      };

      Token.update(query, update, options, function (err, results) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(results);
        }
      });

      return defer.promise;
    }

    /**
     * Finds all active tokens
     * @returns {*}
     */
    function findActiveTokens() {
      var defer = Q.defer();

      var query = {
        revoked : false
      };

      Token.find(query, function (err, results) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(results);
        }
      });

      return defer.promise;
    }
  };

}());
