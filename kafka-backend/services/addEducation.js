const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require("../models/students")
var ObjectId = mongoose.Schema.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)

    Student.updateOne(
        { _id: msg._id },
        {
            $push: {
                education: {
                    collegeName: msg.collegeName,
                    educationLocation: msg.educationLocation,
                    degree: msg.degree,
                    major: msg.major,
                    yearOfPassing: msg.yearOfPassing,
                    cgpa: msg.cgpa
                }
            }
        }
    )
        .exec()
        .then(result => {
            console.log("Add Education Result",result)
            Student.
                find({
                    _id: msg._id
                })
                .exec()
                .then(result => {
                    console.log(result);
                    callback(null, result);
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