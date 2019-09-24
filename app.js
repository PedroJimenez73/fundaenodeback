var express = require('express');
var bodyParser = require('body-parser');

var factura = require('./routes/factura.js');
var usuario = require('./routes/usuario.js');
var login = require('./routes/login');
var curso = require('./routes/curso');

var app = express();
var mongoose = require('mongoose');

var multer = require('multer');

var DIR = './imagenes/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

mongoose.Promise = require('bluebird');

// Mongo URI
const mongoURI = 'mongodb+srv://pedro:stavros@cluster0-zm7ju.mongodb.net/app?retryWrites=true&w=majority';

// Create mongo connection
// const conn = mongoose.createConnection(mongoURI, { promiseLibrary: require('bluebird') });

mongoose.connect(mongoURI, {promiseLibrary: require('bluebird')})     
    .then(()=>{
        console.log('Conectado a Base de Datos');
    })
    .catch((err)=>{
        console.error(err);
    });

var conn = mongoose.connection;

// Init gfs
let gfs;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://lmselerniam.s3-website-eu-west-1.amazonaws.com:80');
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
  });

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}));

app.post('/imagenes', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

app.use('/factura', factura);
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/curso', curso);

app.use('/imagenes', express.static('imagenes'));

const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// git add .
// git commit -m "whatever"
// git push heroku master
// heroku ps:scale web=1