(function () {
  'use strict';

  var motd = require('./motd');
  var login = require('./login');

  module.exports = function(app) {
    motd(app);
    login(app);
  };

}());
