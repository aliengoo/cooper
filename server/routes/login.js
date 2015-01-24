(function () {
  'use strict';

  module.exports = function(app) {

    // requires the authentication middleware is used
    app.post('/login', function (req, res) {
      res.status(200).send(res.authenticationResult);
    });

  };

}());