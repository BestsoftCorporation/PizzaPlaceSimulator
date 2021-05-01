var express = require("express");
var router = express.Router();

var sleep = require('sleep');

const Order = require("../models/order");
const Queue = require("../models/queue");
const Ingredients = require("../models/ingredients");
require("dotenv/config");

var mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

router.post("/order", async (req, res) => {
  var prc = 0;
  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
    pizzas: req.body.pizzas,
    price: prc
  });
  var count = 0;

  await Queue
    .estimatedDocumentCount()
    .then((docCount) => {
      count = docCount;
    })
    .catch((err) => {
      res.json({ message: "Sorry , try again later :(" });
    });

  if (count >= 15) {
    res.json({ message: "Sorry, we are busy right now , try again later :(" });
  } else {
    await order
      .save()
      .then((data) => {
        var time = 0;
        var ids = [];
        order.pizzas.forEach(pizza => {
          if (pizza.size == "Small") {
            time += 1000;
            prc+=200;
          } else if (pizza.size == "Medium") {
            time += 2000;
            prc+=400;
          } else if (pizza.size == "Large") {
            time += 3000;
            prc+=600;
          }
          pizza.i.forEach(element => {
            ids.push(mongoose.Types.ObjectId(element._id)); //add pizza ingredients to array
          });

        });

        Ingredients.aggregate([{ $match: { '_id': { $in: ids } } }, //sum time for all pizza ingredients ordered
        {
          $group:
            { _id: null, sum: { $sum: "$time" }, sumPrice: { $sum: "$price" } }
        }]).exec((err, result) => {
          if (err) {
            res.json({ message: err });
          }
          time += result[0].sum;
          prc += result[0].sumPrice;
          console.log("Price:"+prc);
          const queue = new Queue({
            id: order._id,
            time: time,
          });
          queue.save();
          // prepare();

          Order.updateOne({ _id: order._id }, {
            price:prc
          }, function (err, numberAffected, rawResponse) {
      
          })

          res.json({ "orderID": order._id, "time": time, "PlaceInOrder": count });
        })
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
});


router.post("/checkOrder", function (req, res) {


  Queue.find({ id: mongoose.Types.ObjectId(req.body.orderID) }, function (err, docs) {
    if (docs.length == 0) {
      res.json({ message: "Your order is finsished. :)" });
    } else {
      res.json({ timeLeft: docs[0].time })
    }
  });
});


router.delete("/cancelOrder", function (req, res) {

  Queue.deleteOne({ id: mongoose.Types.ObjectId(req.body.orderID) }, function (err, docs) {
    res.json({ message: "Your order is canceled :(" });
  });

});


async function prepare() {
  console.log(1);
  await sleep.sleep(1000);
  console.log(2);
  return;
}


module.exports = router;
