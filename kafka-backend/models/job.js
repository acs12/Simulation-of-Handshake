const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


const jobSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    companyId : {type : ObjectId, ref : "companies" },
    title : {type : String, required : true},
    location: String,
    postedDate : Date,
    deadlineDate : Date,
    salary : Number,
    description : String,
    category : String,
    application : [{
        studentId : {type : ObjectId, ref : "students" },
    }]
}) 

module.exports = mongoose.model("Job", jobSchema)