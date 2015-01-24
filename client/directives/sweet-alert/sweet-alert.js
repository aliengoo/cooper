(function () {
  'use strict';

  angular.module('app.directives').directive('sweetAlert', sweetAlert);

  function sweetAlert() {
    var exports = {
      restrict : 'E',
      link : link
    };

    return exports;

    function link($s, $e, $a) {

    }
  }

}());
