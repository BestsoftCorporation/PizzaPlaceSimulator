const mongoose = require('mongoose');


var User = mongoose.Schema({
    firstName: String,
    lastName: String, 
    address: String,
    phone: Number,
    orders:[{id:Number}]
  });

  module.exports = mongoose.model('user',User,'user')