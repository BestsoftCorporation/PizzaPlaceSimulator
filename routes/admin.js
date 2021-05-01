var express = require("express");
const order = require("../models/order");
const ingredient = require("../models/ingredients");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

var Order = require("../models/order");
var start = Date.now();

router.get("/totalMoney", function (req, res) {
    let token = req.headers.token; //token

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        });

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
});


//use "password123" to login
router.post("/login", function (req, res) {

    bcrypt.compare(req.body.password, "$2b$10$AEtJljXoapELCOEuYKxLN.DCn45TAe938mM8g87pRf7Drs4hG2A8e", (err, result) => {
        if (err) {
            console.log('bcrypt - error - ', err);
            return res.status(401).json({
                tite: 'login failed',
                error: 'invalid credentials'
            })
        } else {
            if (!result) {
                return res.status(401).json({
                    tite: 'login failed',
                    error: 'invalid credentials'
                })
            } else {
                let token = jwt.sign({ userId: "admin" }, 'secretkey');
                return res.status(200).json({
                    title: 'login sucess',
                    token: token
                })
            }

        }
    });

});

router.get("/TopIngredientsOrdered", function (req, res) {


    let token = req.headers.token; //token

    jwt.verify(token, 'secretkey', (err, decoded) => {

        if (err) return res.status(401).json({
            title: 'unauthorized'
        });

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
});


router.get("/time", function (req, res) {
    let token = req.headers.token; //token

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        });

        var end = Date.now();
        res.json({ executionTime: (end - start) / 1000 })
    });
});


router.get("/orderHistory", function (req, res) {

    let token = req.headers.token; //token

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        });

        Order.find({}, function (err, order) {
            res.send(order);
        });
    });


});

module.exports = router;
