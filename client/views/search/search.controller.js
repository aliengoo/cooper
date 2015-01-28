(function () {
  'use strict';

  angular.module('app.search').controller('Search', Search);

  Search.$inject = ['$log', 'searchService', 'socketService'];

  function Search($log, searchService, socketService) {
    var vm = this;

    socketService.emit('client-hello');

    vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    vm.query = {
      value : ''
    };

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
