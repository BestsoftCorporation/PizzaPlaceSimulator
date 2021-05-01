var express = require("express");
const order = require("../models/order");
const ingredient = require("../models/ingredients");

var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

var Order = require("../models/order");
var start = Date.now();

router.get("/totalMoney", function (req, res) {
    Order.aggregate([
        {
            $group:
                { _id: null, sum: { $sum: "$price" } }
        }]).exec((err, result) => {
            if (err) {
                res.json({ message: err });
            }

            res.json({ totalMoney: result[0].sum });
        });
});



router.get("/TopIngredientsOrdered", function (req, res) {


    var orders = {};

    Order.find({}, function (err, orders) {
        orders.forEach(order => {
            order.pizzas.forEach(pizza => {
                pizza.i.forEach(element => {

                    ingredient.find({
                        '_id': { $in: [mongoose.Types.ObjectId(element._id)] }
                    }, function (err, docs) {
                        res.send(docs);
                    });

                });

            });
        });
    });
});


router.get("/time", function (req, res) {
    var end = Date.now();
    res.json({ executionTime: (end - start) / 1000 })
});


router.get("/orderHistory", function (req, res) {
    var orders = {};

    Order.find({}, function (err, order) {
        res.send(order);
    });


});

module.exports = router;
