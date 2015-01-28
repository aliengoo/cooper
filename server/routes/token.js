(function () {
  'use strict';

  var tokenRepository = require('../data/repositories/tokenRepository');

  module.exports = function(app) {
    app.post('/api/token', postFindAll);
  };

  function postFindAll(page) {

  }

}());
