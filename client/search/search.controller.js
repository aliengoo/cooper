(function () {
  'use strict';

  angular.module('app.search').controller('Search', Search);

  Search.$inject = ['$log', 'searchService'];

  function Search($log, searchService) {
    var vm = this;

    vm.query = {};

    vm.search = function() {
      searchService.search(vm.query, function(results) {
        vm.results = results;
      }, function(error){
        $log.error(error);
        vm.error = error;
      });
    };
  }

}());
