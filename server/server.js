(function () {
  "use strict";

  var express = require('express');

  var app = express();

  // configuration
  var db = require('./data/connectToDb')(process.env.DATABASE_URI);
  app.set('db', db);
  app.set('jwtSecret', 'e3rh23ornweflnefkjniunjnjkb34fwef');
  app.set('jwtExpireInMinutes', 40320);
  app.set('ldapOptions', {
    url: process.env.LDAP_URL,
    searchBase : process.env.LDAP_SEARCH_BASE,
    searchFilter : process.env.LDAP_SEARCH_FILTER,
    adminDn : process.env.LDAP_ADMIN_DN,
    adminPassword : process.env.LDAP_ADMIN_PASSWORD
  });

  // register middleware
  require('./middleware')(app);

  // register routes
  require('./routes')(app);

  // start server
  app.listen(3003, function () {
    console.log('I\'m listening...');
  });
}());