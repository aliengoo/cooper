(function () {
  "use strict";

  var express = require('express');

  var app = express();

  app.set('databaseUri', process.env.DATABASE_URI);

  require('./middleware')(app);
  require('./routes')(app);

  app.listen(3003, function () {
    console.log('I\'m listening...');
  });
}());