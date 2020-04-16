const express = require('express');
const {auth} =require('../../config/passport') 
const router = express.Router();
var kafka = require('../../kafka/client');

// const mongoose = require("mongoose")

const Student = require("../../models/students")
auth()
router.post('/', (req, res, next) => {

    console.log("Req Body", req.body)
    kafka.make_request('PostStudentCreate', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err || results == "Account Exists") {
            if (results == "Account Exists") {
                console.log("Inside err");
                res.status(402).send("Account Exists");
            }
            else {
                console.log("Inside err");
                res.status(404).send("Error");
            }

        } else {
            console.log("Inside else");
            res.status(200).send(results);
        }

    });
})

module.exports = router