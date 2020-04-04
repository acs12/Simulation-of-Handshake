const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

// const mongoose = require("mongoose")

const Student = require("../../models/students")

router.post('/addEducation', (req, res, next) => {

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

router.post('/deleteEducation', (req, res, next) => {

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


router.post('/updateEducation', (req, res, next) => {

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