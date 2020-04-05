const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Event = require("../models/event")
const Student = require("../models/students")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    Event.update(
        { _id: msg._id },
        {
            $addToSet: {
                application : msg.studentId
            }
        }
    )
        .exec()
        .then(result => {
            console.log("first",result)
            Student.update({
                _id: msg.studentId
            }, {
                $set: {
                    resumeUrl: msg.resumeUrl
                }
            })
                .exec()
                .then(result => {
                    console.log("second",result)
                    Event.find(
                        {
                            application : {$nin: [msg.studentId]}
                        }
                    ).exec()
                        .then(result => {
                            console.log("third",result)
                            callback(null, result)
                        })
                        .catch(err => {
                            console.log(err)
                            callback(err, null)
                        })
                })
                .catch(err=>{
                    console.log(err)
                    callback(err,null)
                })
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;