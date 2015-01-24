(function () {
  "use strict";

  var express = require('express');

  var app = express();

  app.set('databaseUri', process.env.DATABASE_URI);

  app.all('*', function(err, req, res, next) {

    console.log(req);
    if (req.headers.authorization) {
      req.jwt = req.headers.authorization.replace('Bearer ', '');
    }

    next();
  });

  require('./middleware')(app);
  require('./routes')(app);

  app.listen(3003, function () {
    console.log('I\'m listening...');
  });
}());