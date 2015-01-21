(function () {
  'use strict';

  angular.module('app.services').factory('authTokenService', authTokenService);

  authTokenService.$inject = ['localStorageService'];

  function authTokenService(localStorageService) {
    var exports = {
      get : get,
      set : set
    };

    return exports;

    // function definitions
    function get() {
      return localStorageService.get('auth-token');
    }

    function set(authToken) {

      if (authToken) {
        localStorageService.set('auth-token', authToken);
      } else {
        localStorageService.remove('auth-token');
      }
    }
  }
}());
