const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

// const mongoose = require("mongoose")

router.get('/', (req, res, next) => {

    console.log("Req Body", req.body)
    kafka.make_request('GetStudents', req.body,function (err, results) {
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

router.post('/', (req, res, next) => {
    console.log("Req Params",req.params)
    console.log("Req Body", req.body)
    kafka.make_request('GetStudentsById', req.body, function (err, results) {
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