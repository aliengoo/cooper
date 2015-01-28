(function () {
  'use strict';

  angular.module('app.services').factory('socketService', socketService);

  socketService.$inject = ['socketFactory'];

  function socketService(socketFactory) {
    var appSocket = socketFactory();

    appSocket.forward('news');

    return appSocket;
  }

}());
