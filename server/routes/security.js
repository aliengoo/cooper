(function () {
  'use strict';

  var Token = require('../models/token').Token;


  module.exports = function (app) {

    // requires the authentication middleware is used
    app.post('/login', function (req, res) {
      res.status(200).send({
        username : res.authenticationResult.username,
        token : res.authenticationResult.token
      });
    });

    app.get('/check-authorization', function (req, res) {

      if (req.headers.authorization) {
        var token = req.headers.authorization.replace('Bearer ', '');

        Token.findByToken(token, function (err, token) {
          if (err) {
            res.status(500).send('error');
          } else {
            if (token && !token.revoked) {
              res.status(200).send();
            } else {
              res.status(401).send('invalid token');
            }
          }
        });
      } else {
        res.status(401).send('nought');
      }
    });
  };

}());