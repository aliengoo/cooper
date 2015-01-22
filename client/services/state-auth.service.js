(function () {
  'use strict';

  angular.module('app.services').factory('stateAuthService', stateAuthService);

  stateAuthService.$inject = ['$q', '$http', '$location', 'apiUrl'];

  function stateAuthService($q, $http, $location, apiUrl) {
    var exports = {
      checkStateAuthorization : checkStateAuthorization
    };

    return exports;

    function checkStateAuthorization(stateName) {
      var defer = $q.defer();

      $http.get(apiUrl + 'check-state-authorization', {
        data : {
          stateName : stateName
        }
      }).success(function(data, status) {
        if (status === 200) {
          defer.resolve();
        }
      }).error(function(data, status) {
        if (status === 401) {
          $location.url('/login');
        }
      });

      return defer.promise;
    }
  }

}());
