(function () {
  'use strict';

  angular.module('app', [
    'ui.router',
    'btford.socket-io',
    'app.directives',
    'app.services',
    'app.home',
    'app.search',
    'app.login'
  ]);

}());
