(function () {
  'use strict';

  module.exports = function(req, res, next) {
    if (req.headers.authorization) {
      req.token = req.headers.authorization.replace('Bearer ', '');
    }
    next();
  };

}());
