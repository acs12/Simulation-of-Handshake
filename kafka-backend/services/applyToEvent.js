const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Event = require("../models/event")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    Event.updateOne(
        { _id: msg._id },
        {
            $push: {
                application: {
                    studentId: msg.studentId
                }
            }
        }
    )
        .exec()
        .then(result => {
            console.log(result)
            Event.find(
                {
                    $where: { "application.studentId" : { $nin: [msg.studentId] } }
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
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;