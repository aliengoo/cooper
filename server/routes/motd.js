(function () {
  "use strict";

  module.exports = function(app) {
    app.get('/motd', function (req, res) {
      res.send({
        message: 'Howdy!'
      });
    });
  };
}());
