(function () {
  'use strict';

  var cors = require('cors');
  var express = require('express');
  var bodyParser = require('body-parser');
  var jwt = require('jsonwebtoken');
  var expressJwt = require('express-jwt');
  var tokenParser = require('./tokenParser');

  module.exports = function(app) {
    app.use(express.static(__dirname + '/../../public'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(tokenParser);

    var authentication = require('./authentication')(app);
    app.use('/login', authentication.authenticateUser);

    app.use(expressJwt({
      secret: app.get('jwtSecret')
    }).unless({path: ['/login', '/motd', '/socket.io/socket.io.js']}));

    // catch all...
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
      } else {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      }
    });

  };

}());
