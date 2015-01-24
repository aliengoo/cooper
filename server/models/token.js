(function () {
  'use strict';

  var mongoose = require('mongoose');

  var tokenSchema = new mongoose.Schema({
    token : {
      required : true,
      type : String
    },
    username : {
      required : true,
      type : String
    },
    issued : {
      required : true,
      type : Date,
      default : Date.now
    },
    revoked : {
      required : true,
      type : Boolean,
      default : false
    },
    ip : {
      type : String
    }
  });

  tokenSchema.methods.revoke = function(cb) {
    this.revoked = true;
    this.save(cb);
  };

  tokenSchema.statics.revokePrevious = function(username, cb) {
    this.model('Token').update({
      username: username
    }, {
      $set : {
        revoked : true
      }
    }, cb);
  };

  module.exports.Token = mongoose.model('Token', tokenSchema, 'tokens');

}());
