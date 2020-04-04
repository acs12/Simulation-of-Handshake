const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Job = require("../models/job")
const Student = require("../models/students")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    Job.updateOne(
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
            Student.updateOne({
                _id: msg.studentId
            }, {
                $set: {
                    resumeUrl: msg.resumeUrl
                }
            })
                .exec()
                .then(result => {
                    Job.find(
                        {
                            $where: { "application.studentId": { $nin: [msg.studentId] } }
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