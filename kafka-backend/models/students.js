const mongoose = require('mongoose');


const studentSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name : {type : String, required : true},
    email : {type : String, required : true},
    phoneNumber: Number,
    dateOfBirth : Date,
    schoolName : {type : String, required : true},
    address : String,
    city : String,
    state : String,
    country : String,
    gradDate : Date,
    major : String,
    profilePicUrl: String,
    careerObjective : String,
    password : {type : String, required : true},
    skills : [String],
    education : [{
        _id : mongoose.Schema.Types.ObjectId,
        collegeName : String,
        educationLocation : String,
        degree : String,
        major : String,
        yearOfPassing : Number,
        cgpa : String
    }],
    experience : [{
        _id : mongoose.Schema.Types.ObjectId,
        companyName : String,
        companyLocation : String,
        title : String,
        startDate : Date,
        endDate : Date,
        description : String
    }]
}) 

module.exports = mongoose.model("Student", studentSchema)