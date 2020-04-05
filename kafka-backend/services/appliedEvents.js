const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Event = require("../models/event")


function handle_request(msg, callback) {
    console.log("message", msg)
    var ID = msg.studentId
    console.log(ID)
    Event.find(
        {
            application : { $in : [ID] }
        },{companyId :1,
        name : 1,
        date: 1,
        time : 1,
        description : 1,
        location : 1,
        eligibility : 1}
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