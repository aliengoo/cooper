(function () {
  'use strict';

  angular.module('app.directives').directive('searchBar', searchBar);

  function searchBar() {
    var exports = {
      templateUrl : 'directives/search-bar/search-bar.html',
      scope : false,
      controller : SearchBar
    };

    return exports;

    SearchBar.$inject = ['$scope', '$timeout', 'hotkeys'];

    function SearchBar($scope, $timeout, hotkeys) {

      $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
      $scope.show = false;

      hotkeys.add({
        combo: 'ctrl+f',
        description: 'Open search',
        allowIn: ['INPUT'],
        callback: function() {
          $scope.show = !$scope.show;

          if ($scope.show) {
            $timeout(function () {
              $('[ng-model="query"]').focus();
            }, 500);
          }
        }
      });

      hotkeys.add({
        combo: 'esc',
        description: 'Close search',
        allowIn: ['INPUT'],
        callback: function() {
          $scope.show = false;

          $scope.query = '';
        }
      });

      hotkeys.add({
        combo: 'enter',
        description: 'Perform search',
        allowIn: ['INPUT'],
        callback: function() {
          $scope.search();

          $scope.show = false;

          $scope.query = '';
        }
      });

      $scope.search = function() {
        console.log('Searching for ' + $scope.query);
      };
    }
  }

}());
