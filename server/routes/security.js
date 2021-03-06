(function () {
  'use strict';

  var tokenRepository = require('../data/repositories/tokenRepository')();

  module.exports = function (app) {
    // requires the authentication middleware is used
    app.post('/login', postLogin);
    app.get('/check-authorization', getCheckAuthorization);
  };

  /**
   * Provide
   *
   * @param req
   * @param res
   */
  function postLogin(req, res) {
    res.status(200).send({
      username: res.result.username,
      token: res.result.token
    });
  }

  /**
   *
   * @param req
   * @param res
   */
  function getCheckAuthorization(req, res) {
    if (req.token) {
      tokenRepository.isActive(req.token).then(function () {
        res.status(200).send();
      }, function () {
        res.status(401).send();
      });

    } else {
      res.status(401).send();
    }
  }

}());