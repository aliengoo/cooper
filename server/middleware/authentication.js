(function () {
  'use strict';

  var jwt = require('jsonwebtoken');
  var Token = require('../models/token').Token;

  module.exports = function (app) {
    var authenticationProvider = require('../security/authenticationProvider')(app);
    var exports = {
      authenticateUser: authenticateUser
    };

    return exports;

    function authenticateUser(req, res, next) {
      if (req.method !== 'POST') {
        res.status(400).end('Method not supported')
      }
      else {
        var body = req.body;

        if (!body.username || !body.password) {
          res.status(400).end('Must provide username or password');
        } else {

          checkCredentials(body, function (err, authenticationResult) {

            if (err && authenticationResult) {
              res.status(401).send(authenticationResult);
            } else {
              if (authenticationResult) {

                if (req.ip) {
                  authenticationResult.ip = req.ip;
                } else if (req.ips && req.ips.length > 0){
                  authenticationResult.ip = req.ips[req.ips.length - 1];
                }

                var token = new Token({

                });

                res.authenticationResult = authenticationResult;
                next();
              } else {
                res.status(400).end('Username or password incorrect');
              }
            }

          });
        }
      }
    }

    function checkCredentials(credentials, cb) {
      var authenticationResult = {
        valid: false,
        token: undefined,
        user: undefined
      };

      function authenticationProviderCallback(err, user) {
        if (err) {

          if (process.env.NODE_ENV === 'development') {
            authenticationResult.err = err;
          }

          cb(err, authenticationResult);

        } else {

          authenticationResult.user = {
            username : credentials.username,
            name : user.gecos
          };
          authenticationResult.valid = true;
          authenticationResult.token = jwt.sign(
            {
              username: credentials.username,
              expireInMinutes: app.get('jwtExpireInMinutes')
            }, app.get('jwtSecret'));

          cb(null, authenticationResult);

        }
      }

      // credentials validation here
      authenticationProvider.authenticate(
        credentials.username,
        credentials.password,
        authenticationProviderCallback);
    }
  };
}());
