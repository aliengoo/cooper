(function () {
  'use strict';

  angular.module('app.services').factory('authService', authService);

  authService.$inject = ['$http', '$q', '$log', 'apiUrl', 'authTokenService'];

  function authService($http, $q, $log, apiUrl, authTokenService) {
    var exports = {
      login : login
    };

    return exports;

    function login(username, password) {

      var defer = $q.defer();

      $http.post(apiUrl + 'login', {
        username : username,
        password : password
      }).then(function(response) {
        authTokenService.set(response.data);
        defer.resolve(response.data);
      }, function(error) {
        authTokenService.reset();
        defer.reject(error);
      });

      return defer.promise;
    }
  }

}());
