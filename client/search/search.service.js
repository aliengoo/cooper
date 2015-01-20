(function () {
  'use strict';

  angular.module('app.search').factory('searchService', searchService);

  searchService.$inject = ['$http', 'apiUrl'];

  function searchService($http, apiUrl) {
    var exports = {
      search: search
    };

    return exports;

    // function definitions
    function search(query, successCallback, errorCallback) {
      $http.post(apiUrl + 'members/search', query)
        .success(successCallback)
        .error(errorCallback);
    }
  }
}());