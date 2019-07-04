var express = require('express');
var bodyParser = require('body-parser');

var factura = require('./routes/factura.js');

var app = express();
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb+srv://pedro:stavros@cluster0-zm7ju.mongodb.net/test?retryWrites=true&w=majority', {promiseLibrary: require('bluebird')})     
    .then(()=>{
        console.log('Conectado a Base de Datos');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}));

app.use('/factura', factura);

app.listen(process.env.PORT || 3000);
