const mongoose = require('mongoose');


var Queue = mongoose.Schema({
    id: Object ,
    time: Number
  });

  module.exports = mongoose.model('queue',Queue,'queue')