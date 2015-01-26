(function () {
  'use strict';

  angular.module('app.services').factory('authInterceptorService', authInterceptorService);

  authInterceptorService.$inject = ['$q', '$injector', 'authTokenService'];

  var pathsToExclude = ['/login'];

  function authInterceptorService($q, $injector, authTokenService) {
    var exports = {
      request: request,
      responseError : responseError
    };

    return exports;

    // function definitions
    function request(config) {

      var exit = false;

      angular.forEach(pathsToExclude, function (excludedPath) {
        if (config.url.indexOf(excludedPath) >= 0) {
          exit = true;
        }
      });

      if (exit) {
        return config;
      }

      var token = authTokenService.get();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token.token;
      }

      return config;
    }

    function responseError(rejection) {
      if (rejection.status === 401) {
        $injector.get('$state').go('login');
      }
      return $q.reject(rejection);
    }

  }


}());