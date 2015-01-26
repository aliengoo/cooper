(function () {
  'use strict';

  var saltGenerator = require('./saltGenerator')(256);
  var Q = require('q');
  var jwt = require('jsonwebtoken');

  /**
   * Validates user credentials
   *
   * @param jwtExpireInMinutes - the number of minutes the token is valid for
   * @param jwtSecret - the secret used to sign the token
   * @param authenticationProvider - the provider responsible to verify the presented credentials
   * @returns {{validate: validate}}
   */
  module.exports = function (jwtExpireInMinutes, jwtSecret, authenticationProvider) {
    var exports = {
      validate: validate
    };

    return exports;

    /**
     * Validates user credentials and returns promise
     * @param username
     * @param password
     * @returns {*}
     */
    function validate(username, password) {
      var defer = Q.defer();

      var result = {
        valid: false,
        token: undefined,
        username: undefined
      };

      // credentials validation here
      var promise = authenticationProvider.authenticate(
        username,
        password);

      /**
       * On successful validation, resolve
       */
      function onSuccess() {
        defer.resolve({
          username: username,
          valid: true,
          salt: saltGenerator.generate(),
          token: jwt.sign(
            {
              username: username,
              expireInMinutes: jwtExpireInMinutes,
              salt: result.salt
            }, jwtSecret)
        });
      }

      /**
       * On error, reject
       * @param err
       */
      function onError(err) {
        defer.reject(err);
      }

      promise.then(onSuccess, onError).done();

      return defer.promise;
    }
  };

}());
