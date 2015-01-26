(function () {
  'use strict';

  var mongoose = require('mongoose');

  var memberSchema = new mongoose.Schema({
    firstName : {
      type : String,
      required : true
    },
    middleNames : {
      type : String
    },
    lastName : {
      type : String,
      required : true
    },
    title : {
      type : String,
      required : true
    },
    reference : {
      unique : true,
      uppercase : true
    },
    status : {
      type : String,
      enum : ['pristine', 'posted']
    },
    platform : {
      type : String,
      enum : ['web', 'office']
    },
    voteTimestamp : {
      type : Date
    }
  });

  module.exports.Member = mongoose.model('Member', memberSchema, 'members');

}());
