(function () {
  'use strict';

  module.exports = function (app) {
    app.set('jwtSecret', 'e3rh23ornweflnefkjniunjnjkb34fwef');
    app.set('jwtExpireInMinutes', 40320);

    var ldapOptions = {
      url: process.env.LDAP_URL,
      searchBase : process.env.LDAP_SEARCH_BASE,
      searchFilter : process.env.LDAP_SEARCH_FILTER,
      adminDn : process.env.LDAP_ADMIN_DN,
      adminPassword : process.env.LDAP_ADMIN_PASSWORD
    };

    app.set('ldapOptions', ldapOptions);
  };

}());
