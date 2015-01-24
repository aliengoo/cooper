(function () {
  'use strict';

  angular.module('app.services').factory('authService', authService);

  authService.$inject = ['$http', 'apiUrl'];

  function authService($http, apiUrl) {
    var exports = {
      login : login
    };

    return exports;

    function login(username, password) {
      return $http.post(apiUrl + 'login', {
        username : username,
        password : password
      });
    }
  }

}());
