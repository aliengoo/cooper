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
    address : {
      line1 : {
        type : String,
        required : true
      },
      line2 : {
        type : String
      },
      line3 : {
        type : String
      },
      postTown : {
        type : String,
        required : true
      },
      postcode : {
        type : String
      }
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

  memberSchema.index({
    lastName : 'text',
    reference : 'text',
    'address.line1' : 'text',
    'address.postcode' : 'text'
  });

  module.exports.Member = mongoose.model('Member', memberSchema, 'members');

}());
