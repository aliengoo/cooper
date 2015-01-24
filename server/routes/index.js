(function () {
  'use strict';

  var motd = require('./motd');
  var security = require('./security');

  module.exports = function(app) {
    motd(app);
    security(app);
  };

}());
