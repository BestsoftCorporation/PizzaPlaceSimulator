const express = require('express');

const app = express();

var bodyParser = require('body-parser')
 

var pizzaCreator = require('./routes/pizzaCreator');

app.use( bodyParser.json() ); 
app.get("/",(req,res) => {
    res.send('homme');
});

app.use('/', pizzaCreator);

app.listen(3000);