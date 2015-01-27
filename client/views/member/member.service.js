(function () {
  'use strict';

  angular.module('app.member').factory('memberService', memberService);

  memberService.$inject = ['$http', 'apiUrl'];

  var defaultPage = {
    size : 1,
    current : 10
  };

  function memberService($http, apiUrl) {
    var exports = {
      findAll : findAll,
      find : find,
      get : get,
      save : save
    };

    return exports;

    function findAll(page) {
      if (!page) {
        page = angular.copy(defaultPage);
      }

      return $http.post(apiUrl + 'member/all', {
        data : page
      });
    }

    function find(query) {
      if (!query) {
        query = {
        };
      }

      if (!query.page) {
        query.page = angular.copy(defaultPage);
      }

      return $http.post(apiUrl + 'member/query', {
        data : query
      });
    }

    function get(id) {
      return $http.get(apiUrl + 'member/' + id);
    }

    function save(member) {
      return $http.put(apiUrl + 'member', {
        data : member
      });
    }
  }

}());
