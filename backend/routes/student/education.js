const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');
const {auth,checkAuth} =require('../../config/passport') 
auth()

router.post('/addEducation',checkAuth, (req, res, next) => {

    console.log("Req Body", req.body)
    kafka.make_request('PostAddEducation', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(404).send("Error");
        } else {
            console.log("Inside else");
            res.status(200).send(results);
        }

    });
})

router.post('/deleteEducation', checkAuth,(req, res, next) => {

    console.log(typeof(req.body))
    console.log("Req Body", req.body)
    kafka.make_request('DeleteEducation', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(404).send("Error");
        } else {
            console.log("Inside else");
            res.status(200).send(results);
        }

    });
})


router.post('/updateEducation',checkAuth, (req, res, next) => {

    console.log("Req Body", req.body)
    kafka.make_request('UpdateEducationDetails', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(404).send("Error");
        } else {
            console.log("Inside else");
            res.status(200).send(results);
        }

    });
})


module.exports = router