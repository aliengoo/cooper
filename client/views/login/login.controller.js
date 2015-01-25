(function () {
  'use strict';

  angular.module('app.login').controller('Login', Login);

  Login.$inject = ['$log', '$state', 'authService'];

  function Login($log, $state, authService) {
    var vm = this;

    vm.username = 'fred';
    vm.password = 'trustno1';

    vm.login = function(username, password) {
      vm.loginFailed = false;

      authService.login(username, password).then(function() {
        $state.go('home');
      }, function(error) {
        vm.loginFailed = true;
        $log.error(error);
      });
    };
  }

}());
