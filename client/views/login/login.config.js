(function () {
  'use strict';

  angular.module('app.login').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('login', {
      url : '/login',
      controller : 'Login as vm',
      templateUrl : 'login/login.html'
    });
  }

}());
