const mongoose = require('mongoose');

var Order = mongoose.Schema({
    firstName: String,
    lastName: String, 
    address: String,
    phone: String,
    pizzas:[
        
        {
            size:String,
            i:[
              {_id: String}
            ]
        }],
    price:Number
      
  });

  module.exports = mongoose.model('order',Order,'order')