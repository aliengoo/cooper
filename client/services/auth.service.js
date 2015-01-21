(function () {
  'use strict';

  angular.module('app.services').factory('authService', authService);

  authService.$inject = ['$http'];

  function authService($http) {
    var exports = {
      login : login
    };

    return exports;

    function login(username, password) {
      return $http.post('/login', {
        username : username,
        password : password
      });
    }
  }

}());
