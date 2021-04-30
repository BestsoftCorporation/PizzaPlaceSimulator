const mongoose = require('mongoose');

var Ingredient = mongoose.Schema({
    name: String,
    price: Number,
    time: Number,
  });

  module.exports = mongoose.model('ingredients',Ingredient,'ingredients')