(function () {
  'use strict';

  angular.module('app').config(config);

  config.$inject = ['$urlRouterProvider', '$httpProvider'];

  function config($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('authInterceptorService');
  }

}());
