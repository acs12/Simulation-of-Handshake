const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

// const mongoose = require("mongoose")

const Student = require("../../models/students")

router.post('/', (req, res, next) => {
    console.log('in result');
    req.body.postedDate = Date.now()
    console.log("Posted Date",req.body.postedDate)
    console.log("Req Body", req.body)
    kafka.make_request('AddJob', req.body, function (err, results) {
        
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