const express = require('express');

const app = express();

var bodyParser = require('body-parser')
 

var pizzaCreator = require('./routes/pizzaCreator');
var admin = require("./routes/admin");

app.use( bodyParser.json() ); 

app.get("/",(req,res) => {
    res.send('homme');
});


app.use('/', pizzaCreator);
app.use("/admin",admin);

app.listen(3000);