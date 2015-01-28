(function () {
  'use strict';

  angular.module('app').controller('App', App);

  App.$inject = ['$scope'];

  function App($scope) {

    $scope.$on('socket:news', function() {
      console.log('There is newsqwdqwdqwd from the server');
    });
  }

}());
