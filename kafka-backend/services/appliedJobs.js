const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Job = require("../models/job")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    if (msg.status) {
        Job.find(
            {
                "application.studentId": { $in: [msg.studentId] },
                "application.status": { $in: [msg.status] }
            }
        ).populate("companyId")
            .then(result => {
                console.log(result)
                callback(null, result)
            })
            .catch(err => {
                console.log(err)
                callback(err, null)
            })
    }
    else{
        Job.find(
            {
                "application.studentId": { $in: [msg.studentId] },
            }
        ).populate("companyId")
            .then(result => {
                console.log(result)
                callback(null, result)
            })
            .catch(err => {
                console.log(err)
                callback(err, null)
            })
    }
}

exports.handle_request = handle_request;