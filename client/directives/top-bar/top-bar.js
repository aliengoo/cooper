(function () {
  'use strict';

  angular.module('app.directives').directive('topBar', topBar);

  function topBar() {
    var ddo = {
      restrict : 'E',
      templateUrl : 'directives/top-bar/top-bar.html'
    };

    return ddo;
  }

}());
