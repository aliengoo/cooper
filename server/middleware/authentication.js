(function () {
  'use strict';

  var jwt = require('jsonwebtoken');
  var Token = require('../models/token').Token;
  var crypto = require('crypto');

  module.exports = function (app) {
    var authenticationProvider = require('../security/authenticationProvider')(app);
    var exports = {
      authenticateUser: authenticateUser
    };

    return exports;

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    function authenticateUser(req, res, next) {

      function checkCredentialsHandler(err, authenticationResult) {
        if (err && authenticationResult) {
          res.status(401).send(authenticationResult);
        } else {
          if (authenticationResult) {
            authenticationResult.revoked = false;

            var token = new Token(authenticationResult);

            token.save(function(err, result) {
              if (err) {
                res.status(500).send('an error occurred');
              } else {
                res.authenticationResult = result;
                next();
              }
            });
          } else {
            res.status(400).end('Username or password incorrect');
          }
        }
      }

      if (req.method !== 'POST') {
        res.status(400).end('Method not supported')
      }
      else {
        var body = req.body;

        if (!body.username || !body.password) {
          res.status(400).end('Must provide username or password');
        } else {
          checkCredentials(body, checkCredentialsHandler);
        }
      }
    }

    /**
     *
     * @param credentials
     * @param cb
     */
    function checkCredentials(credentials, cb) {
      var result = {
        valid: false,
        token: undefined,
        username: undefined
      };

      function authenticationProviderCallback(err, user) {
        if (err) {

          if (process.env.NODE_ENV === 'development') {
            result.err = err;
          }

          cb(err, result);

        } else {
          result.username = credentials.username;
          result.valid = true;
          result.salt = new Buffer(crypto.randomBytes(256)).toString('base64');
          result.token = jwt.sign(
            {
              username: credentials.username,
              expireInMinutes: app.get('jwtExpireInMinutes'),
              salt : result.salt
            }, app.get('jwtSecret'));

          cb(null, result);

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
