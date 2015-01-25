(function () {
  'use strict';

  angular.module('app').config(config);

  config.$inject = ['$urlRouterProvider', '$httpProvider', 'authInterceptorServiceProvider'];

  function config($urlRouterProvider, $httpProvider, authInterceptorServiceProvider) {
    $urlRouterProvider.otherwise('/');

    authInterceptorServiceProvider.excludePaths(['/login']);

    $httpProvider.interceptors.push('authInterceptorService');
  }

}());
