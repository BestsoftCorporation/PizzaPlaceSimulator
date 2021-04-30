var express = require("express");
var router = express.Router();
const Pizza = require("../models/pizza");
const Order = require("../models/order");
const Queue = require("../models/queue");
require("dotenv/config");

var mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

router.post("/createPizza", function (req, res, next) {
  const pizza = new Pizza({
    Price: 100,
    Time: 100,
    Complited: false,
    Ingredients: req.body.Ingredients,
  });
  pizza
    .save()
    .then((data) => {
      const queue = new Queue({
        id: pizza.id,
      });
      queue.save();
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/order", function (req, res, next) {
  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phone: req.body.phone,
    pizzas: req.body.pizzas,
  });
  var count = 0;

  Order
    .estimatedDocumentCount()
    .then((docCount) => {
      console.log(docCount);
      count = docCount;
    })
    .catch((err) => {
      res.json({ message: "Sorry , try again later :(" });
    });

  if (count >= 15) {
    res.json({ message: "Sorry, we are busy right now , try again later :(" });
  } else {
    order
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
});

module.exports = router;
