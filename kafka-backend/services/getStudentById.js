const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require("../models/students")




function handle_request(msg, callback) {
    console.log("message", msg)
    Student.findOne({
        _id:msg.studentId
    })
        .exec()
        .then(result => {
            console.log("result",result);
            callback(null, result);
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })

}

exports.handle_request = handle_request;