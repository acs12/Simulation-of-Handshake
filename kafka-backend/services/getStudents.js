const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require("../models/students")




function handle_request(msg,callback) {
    
    Student.find({

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

}

exports.handle_request = handle_request;