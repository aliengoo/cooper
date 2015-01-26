(function () {
  'use strict';

  var LdapAuth = require('ldapauth');
  var Q = require('q');

  module.exports = function (ldapOptions) {
    var exports = {
      authenticate: authenticate
    };

    return exports;

    function authenticate(username, password) {
      var deferred = Q.defer();

      var auth;

      try {
        auth = new LdapAuth(ldapOptions);
      } catch (ex) {
        console.log(ex);
        throw ex;
      }

      auth.authenticate(username, password, function(err, user) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(user);
        }
      });

      return deferred.promise;
    }
  };

}());
