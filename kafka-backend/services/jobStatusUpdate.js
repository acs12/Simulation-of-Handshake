const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Job = require("../models/job")
const Student = require("../models/students")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    Job.update(
        { _id: msg._id },
        {
            $set: {
                "application.$[app].status": msg.status,
            }
        }, {
        arrayFilters: [{ "app._id": msg.appId }],
    }
    )
        .exec()
        .then(result => {
            console.log("first", result)
            callback(null, "success")
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;