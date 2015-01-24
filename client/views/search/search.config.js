(function () {
  'use strict';

  angular.module('app.search').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('search', {
      url  :'/search',
      controller : 'Search as vm',
      templateUrl : 'search/search.html',
      resolve : {
        authorized : ['stateAuthService', function(stateAuthService) {
          return stateAuthService.checkAuthorization('search');
        }]
      }
    });
  }

}());
