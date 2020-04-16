const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Message = require("../models/message")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    Message.find(
        {
            type: "company",
            user2: msg.studentId
        }
    ).populate("user1").exec()
        .then(results => {
            console.log("result", results)
            callback(null,results)
        })
        .catch(err=>{
            console.log("err",err)
            callback(err,null)
        })
}

exports.handle_request = handle_request;