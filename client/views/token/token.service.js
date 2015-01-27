(function () {
  'use strict';

  angular.module('app.token').factory('tokenService', tokenService);

  tokenService.$inject = ['$http', 'apiUrl'];

  function tokenService($http, apiUrl) {
    var exports = {
      findAll : findAll,
      revoke : revoke
    };

    return exports;

    function findAll(page) {
      if (!page) {
        page = {
          size : 10,
          current : 1
        };
      }

      return $http.post(apiUrl + 'token', {
        data : page
      });
    }

    function revoke(id) {
      return $http.delete(apiUrl + 'token' + id);
    }
  }

}());
