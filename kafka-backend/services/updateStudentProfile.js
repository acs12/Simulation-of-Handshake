const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require("../models/students")




function handle_request(msg, callback) {
    console.log("message", msg)


    Student.
        updateOne(
            {
                _id: msg._id
            },
            {
                $set: {
                    name: msg.name,
                    dateOfBirth: msg.dateOfBirth,
                    address: msg.address,
                    city: msg.city,
                    state: msg.state,
                    country: msg.country,
                    gradDate: msg.gradDate,
                    major: msg.major,
                    profilePicUrl: msg.profilePicUrl,
                }
            })
        .exec()
        .then(result => {
            Student.
                findOne({
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