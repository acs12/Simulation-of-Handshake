const mongoose = require('mongoose');
const Student = require("../models/students")
const Company = require("../models/company")
var ObjectId = mongoose.Schema.Types.ObjectId;


const messageSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    user1 : {type : ObjectId},
    user2 : {type : ObjectId},
    chat: [{
        from : {type : ObjectId},
        to : {type : ObjectId},
        text : String,
        date : Date
    }],
})

module.exports = mongoose.model("Message", messageSchema)