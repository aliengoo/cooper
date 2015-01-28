(function () {
  'use strict';

  angular.module('app').controller('App', App);

  App.$inject = ['$scope', 'socketService'];

  function App($scope, socketService) {
    socketService.on('socket:news', function (ev, data) {
      console.log('There is news from the server');
    });
  }

}());
