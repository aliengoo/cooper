(function () {
  'use strict';

  var mongoose = require('mongoose');

  module.exports = function(app) {
    var databaseUri = app.get('databaseUri');

    mongoose.connect(databaseUri);

    var db = mongoose.connection;

    db.on('error', function (err) {
      console.error(err);
    });

    db.on('open', function () {
      console.log('database open...');
    });

    db.on('disconnected', function () {
      console.log('disconnected from database - bye!');
    });

    // called when the process is terminated, e.g. Ctrl + c
    process.on('SIGINT', function () {
      db.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
      });
    });

    app.set('db', db);

    return db;
  };

}());
