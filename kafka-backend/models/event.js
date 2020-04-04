const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


const eventSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    companyId : {type : ObjectId, ref : "companies" },
    name : {type : String, required : true},
    date: Date,
    time : Date,
    description : String,
    location : String,
    eligibility : String,
    application : [
         {type : ObjectId, ref : "students" }
    ]
}) 

module.exports = mongoose.model("Event", eventSchema)