(function () {
  'use strict';

  angular.module('app.home').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('home', {
      url : '/',
      templateUrl : 'home/home.html',
      controller : 'Home as vm',
      resolve : {
        authorized : ['stateAuthService', function(stateAuthService) {
          return stateAuthService.checkAuthorization('home');
        }]
      }
    });
  }

}());