var express = require('express');
var router = express.Router();
const User=require("../models/user"); 
require('dotenv/config');

var mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

router.post('/createUser', function(req, res, next) {
   
    const user= new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      address:req.body.address,
      phone:req.body.phone
    });
    user.save()
          .then(data=>{
            res.json(data);
          })
          .catch(err=> {
             res.json({ message:err});
          });
});




module.exports = router;