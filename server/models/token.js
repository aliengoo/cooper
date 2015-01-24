(function () {
  'use strict';

  var mongoose = require('mongoose');

  var tokenSchema = new mongoose.Schema({
    token: {
      required: true,
      type: String
    },
    username: {
      required: true,
      type: String
    },
    issued: {
      required: true,
      type: Date,
      default: Date.now
    },
    revoked: {
      required: true,
      type: Boolean,
      default: false
    },
    ip: {
      type: String
    }
  });

  tokenSchema.pre('save', function (next) {
    this.model('Token').revokePrevious(this.username, function (err, doc) {
      if (err) {
        throw err;
      } else {
        next();
      }
    });
  });

  tokenSchema.methods.revoke = function (cb) {
    this.revoked = true;
    this.save(cb);
  };

  tokenSchema.statics.revokePrevious = function (username, cb) {
    var query = {
      username: username
    };

    var update = {
      $set: {
        revoked: true
      }
    };

    var options = {
      multi : true
    };

    this.model('Token').update(query, update, options, cb);
  };

  tokenSchema.statics.findByToken = function(token, cb) {
    this.model('Token').findOne({
      token : token
    }, cb);
  };

  module.exports.Token = mongoose.model('Token', tokenSchema, 'tokens');

}());
