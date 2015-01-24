(function () {
  'use strict';

  var LdapAuth = require('ldapauth');

  module.exports = function (app) {
    var exports = {
      authenticate: authenticate
    };

    return exports;

    function authenticate(username, password, callback) {
      var auth;

      try {
        auth = new LdapAuth(app.get('ldapOptions'));
      } catch (ex) {
        console.log(ex);
        throw ex;
      }

      auth.authenticate(username, password, callback);
    }
  };

}());
