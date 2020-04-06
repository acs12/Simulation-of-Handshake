const express = require('express');
var app = express();
const router = express.Router();
var kafka = require('../../kafka/client');
const multer = require('multer');
var path = require('path');

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
app.use('../../uploads', express.static(path.join(__dirname, '/uploads')));

router.post('/',  upload.single('resumeUrl'),(req, res, next) => {
    console.log("Inside upload resume for student post request");
    console.log("Req body", req.body)
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var filepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    req.body.resumeUrl = filepath
    console.log("Req Body", req.body)
    kafka.make_request('ApplyToJob', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(404).send("Error");
        } else {
            console.log("Inside else");
            res.status(200).redirect("http://localhost:3000/SJob/StudentJob")
        }

    });
})

module.exports = router