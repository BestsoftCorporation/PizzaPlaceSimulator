var express = require("express");
var router = express.Router();


var Order = require("../models/order");

router.get("/totalMoney", function (req, res) {
    Order.aggregate([
    {
      $group:
        { _id: null, sum: { $sum: "$price" }}
    }]).exec((err, result) => {
      if (err) {
        res.json({ message: err });
      }  

      res.json({totalMoney:result[0].sum});
    });
});

module.exports = router;
