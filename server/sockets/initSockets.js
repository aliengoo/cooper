(function () {
  'use strict';

  module.exports = function (app) {

    var server = require('http').createServer(app);

    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
      console.log('Client connected...');
      socket.emit('news', {hello: 'world'});
      socket.on('client-hello', function (data) {
        console.log('client said hello');

      });
    });

    return server;
  };

}());
