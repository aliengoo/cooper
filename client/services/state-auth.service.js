(function () {
  'use strict';

  angular.module('app.services').factory('stateAuthService', stateAuthService);

  stateAuthService.$inject = ['$q', '$http', '$location', 'apiUrl', 'authTokenService'];

  function stateAuthService($q, $http, $location, apiUrl, authTokenService) {
    var exports = {
      checkAuthorization : checkAuthorization
    };

    return exports;

    function checkAuthorization(stateName) {
      var defer = $q.defer();

      $http.get(apiUrl + 'check-authorization', {
        data : {
          stateName : stateName
        }
      }).success(function(data, status) {
        if (status === 200) {
          defer.resolve();
        }
      }).error(function(data, status) {
        if (status === 401) {
          authTokenService.set();
          defer.reject();
          $location.url('/login');
        }
      });

      return defer.promise;
    }
  }

}());
