(function () {
  'use strict';

  var crypto = require('crypto');

  module.exports = function(size) {
    var exports = {
      generate : generate
    };

    return exports;

    function generate() {
      return new Buffer(crypto.randomBytes(size || 256)).toString('base64');
    }
  };

}());
