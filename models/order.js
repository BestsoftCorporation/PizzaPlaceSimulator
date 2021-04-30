const mongoose = require('mongoose');

var Order = mongoose.Schema({
    firstName: String,
    lastName: String, 
    address: String,
    phone: String,
    pizzas:[
        {
            i:[
              {_id: String}
            ]
        }]
  });

  module.exports = mongoose.model('order',Order,'order')