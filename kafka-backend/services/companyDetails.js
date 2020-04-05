const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Company = require("../models/company")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)

    Company.find(
        {
            _id:msg.companyId
        }
    )
        .exec()
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