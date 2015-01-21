(function () {
  'use strict';

  angular.module('app.login').controller('Login', Login);

  Login.$inject = ['$log', 'authService'];

  function Login($log, authService) {
    var vm = this;

    vm.login = function(username, password) {
      authService.login(username, password).success(function(response) {
        vm.loginResponse = response;
      }, $log.error);

    };
  }

}());
