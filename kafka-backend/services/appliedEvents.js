const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Event = require("../models/job")


function handle_request(msg, callback) {
    console.log("message", msg)
    Event.find(
        {
            "application.studentId" : msg.studentId
        }
    ).exec()
        .then(result => {
            console.log(result)
            callback(null, result)
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;