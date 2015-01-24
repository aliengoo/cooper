(function () {
  'use strict';

  angular.module('app.services').factory('authInterceptorService', authInterceptorService);

  authInterceptorService.$inject = ['authTokenService'];

  function authInterceptorService(authTokenService) {
    var exports = {
      request : request
    };

    return exports;

    // function definitions
    function request(config) {

      if (config.url.indexOf('/login') >= 0) {
        return config;
      }

      var token = authTokenService.get();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token.token;
      }

      return config;
    }
  }
}());