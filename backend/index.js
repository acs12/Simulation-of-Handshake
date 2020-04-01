const process = require("./nodemon.json")
const express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const multer = require('multer');
var path = require('path');
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser');
var cors = require('cors');
// app.set('view engine', 'ejs');

const student = require("./routes/student/students");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(cookieParser());
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next();
});

app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://admin:' + process.env.Mongo_Atlas_PWD + '@cluster0-mgk28.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/student",student)

app.listen(process.env.port, () => { console.log('Server is running on port',process.env.port) });