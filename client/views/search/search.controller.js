(function () {
  'use strict';

  angular.module('app.search').controller('Search', Search);

  Search.$inject = ['$log', 'searchService', 'socketService'];

  function Search($log, searchService, socketService) {
    var vm = this;

    socketService.emit('client-hello');

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
