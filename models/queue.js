const mongoose = require('mongoose');


var Queue = mongoose.Schema({
    id: Object 
  });

  module.exports = mongoose.model('queue',Queue,'queue')