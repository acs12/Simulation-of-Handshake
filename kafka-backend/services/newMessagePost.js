const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Message = require("../models/message")
var ObjectId = mongoose.Types.ObjectId;


function handle_request(msg, callback) {
    console.log("message", msg)
    // if (msg.chatId) {
    //     if (msg.text) {
    //         Message.updateOne(
    //             {
    //                 _id: msg.chatId
    //             }
    //             , {
    //                 $push: {
    //                     chat: {
    //                         from: msg._id,
    //                         to: msg.id,
    //                         text: msg.text,
    //                         date: Date.now()
    //                     }
    //                 }
    //             }).exec()
    //             .then(result => {
    //                 console.log("after update result", result)
    //                 Message.findOne({
    //                     _id: msg.chatId
    //                 }).exec()
    //                     .then(result => {
    //                         console.log("after update and result", result)
    //                         callback(null, result)
    //                     })
    //                     .catch(err => {
    //                         console.log("after update and err", err)
    //                         callback(err, null)
    //                     })
    //             })
    //             .catch(err => {
    //                 console.log("after Update error", err)
    //                 callback(err, null)
    //             })
    //     }
    //     else {
    //         Message.findOne({
    //             _id: msg.chatId
    //         }).exec()
    //             .then(result => {
    //                 console.log("after update and result", result)
    //                 callback(null, result)
    //             })
    //             .catch(err => {
    //                 console.log("after update and err", err)
    //                 callback(err, null)
    //             })
    //     }
    // }
    Message.findOne(
        {
            $or: [{
                user1: msg._id,
                user2: msg.id
            }, {
                user1: msg.id,
                user2: msg._id
            }]
        }
    ).exec()
        .then(results => {
            console.log("result", results)
            if (results !== null) {
                console.log("inside if so result is not null")
                if (msg.text) {
                    Message.updateOne(
                        {
                            _id: results._id
                        }
                        , {
                            $push: {
                                chat: {
                                    from: msg._id,
                                    to: msg.id,
                                    text: msg.text,
                                    date: Date.now()
                                }
                            }
                        }).exec()
                        .then(result => {
                            console.log("after update result", result)
                            Message.findOne({
                                _id: results._id
                            }).exec()
                                .then(result => {
                                    console.log("after update and result", result)
                                    callback(null, result)
                                })
                                .catch(err => {
                                    console.log("after update and err", err)
                                    callback(err, null)
                                })
                        })
                        .catch(err => {
                            console.log("after Update error", err)
                            callback(err, null)
                        })
                }
                else{
                    Message.find(
                        {
                            _id: results._id  
                        }
                    ).exec()
                    .then(res => {
                        console.log("res",res)
                        callback(null,res)
                    })
                    .catch(err => {
                        console.log("err",err)
                        callback(err,null)
                    })
                }
            }
            else if (results === null) {
                const message = new Message({
                    user1: msg._id,
                    user2: msg.id,
                    chat: {
                        from: msg._id,
                        to: msg.id,
                        text: msg.text,
                        date: Date.now()
                    }
                });
                message.save()
                    .then(result => {
                        console.log(result)
                        callback(null, result)
                    })
                    .catch(err => {
                        console.log(err)
                        callback(err, null)
                    })
            }
        })
}

exports.handle_request = handle_request;