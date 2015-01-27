(function () {
  'use strict';

  angular.module('app.token').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider.state('tokens', {
      url: '/tokens',
      templateUrl: '/tokens/tokens.html',
      controller: 'Tokens as vm',
      resolve : {
        tokens : ['tokenService', function(tokenService){
          return tokenService.findAll({
            size : 10,
            current : 1
          });
        }]
      }
    });
  }
}());