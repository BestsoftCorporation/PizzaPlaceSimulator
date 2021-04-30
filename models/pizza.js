const mongoose = require('mongoose');

var ingredient=require("./ingredients");

var Pizza = mongoose.Schema({
    Price: Number,
    Time: Number,
    Complited: Boolean,
    Ingredients:[{  
      name: String,
      price: Number,
      time: Number}]
  });

  module.exports = mongoose.model('pizza',Pizza,'pizza')