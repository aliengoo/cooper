(function () {
  'use strict';

  var Token = require('./token').Token;

  module.exports = function (app) {
    var authenticationProvider = require('../security/authenticationProvider')(
      app.get('ldapOptions'));

    var credentialsValidator = require('../security/credentialsValidator')(
      app.get('jwtExpireInMinutes'),
      app.get('jwtSecret'),
      authenticationProvider);

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

      if (req.method !== 'POST') {
        res.status(400).end('Method not supported')
      }
      else {
        var body = req.body;

        if (!body.username || !body.password) {
          res.status(400).end('Must provide username or password');
        } else {
          var promise = credentialsValidator.validate(
            req.body.username,
            req.body.password);
          promise.then(onSuccess, onError);
        }
      }

      // promise handlers
      function onSuccess(result) {
        result.revoked = false;
        res.result = result;

        var token = new Token(result);

        token.save(function (err) {
          if (err) {
            res.status(500).send('an error occurred').end();
          } else {
            next();
          }
        });
      }

      function onError() {
        res.status(401).send({
          message: 'Not authorized'
        });
      }
    }
  };
}());
