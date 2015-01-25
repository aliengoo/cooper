(function () {
  'use strict';

  angular.module('app.services').provider('authInterceptorService', function () {
    var pathsToExclude = [];

    return {
      excludePaths: function (exclusions) {
        pathsToExclude = pathsToExclude.concat(exclusions);
      },

      $get: function () {
        return ['authTokenService', function (authTokenService) {
          var exports = {
            request: request
          };

          return exports;

          // function definitions
          function request(config) {

            console.log('Hit');

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
        }];
      }
    };
  });


}());