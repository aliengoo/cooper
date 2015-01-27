(function () {
  'use strict';

  var Token = require('../models/token').Token;
  var Q = require('q');

  module.exports = function() {
    var exports = {
      findByToken : findByToken,
      revokePrevious : revokePrevious,
      findActiveTokens : findActiveTokens,
      getPage : getPage,
      isActive : isActive
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
        value : token
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

    function isActive(token) {
      var defer = Q.defer();

      Token.findOne({
        value : token
      }, function(err, doc) {
        if (err) {
          defer.reject();
        } else {
          if (doc.revoked) {
            defer.reject();
          } else {
            defer.resolve();
          }
        }
      });

      return defer.promise;
    }

    function getPage(page) {
      if (!page) {
        page = {
          current : 1,
          size : 10
        };
      }

      var defer = Q.defer();

      Token.find({}, {}, {}, function(err, tokens) {

      });

      return defer.promise;
    }

    function calculatePage(page, count) {
      f (count < 1) {
        page.current = 0;
        page.totalPages = 0;
      }

      var remainder = count % page.size;

      page.totalItems = count;
      page.totalPages = parseInt((count / page.size) + (remainder > 0 ? 1 : 0));

      page.current = page.current < 1 ? 1 : page.current;

      if (page.totalPages < page.current) {
        page.current = page.totalPages;
      }

      if (page.current > 0) {
        page.skip = (page.current - 1) * page.size;
      }

      return page;
    }

  };

}());
