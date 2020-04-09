const process = require("./nodemon.json")
const express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const multer = require('multer');
var path = require('path');
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser');
var cors = require('cors');
// app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next();
});
//common
const getStudents = require('./routes/common/getStudents')

//student
const student = require("./routes/student/students");
const studentLogin = require("./routes/student/login")

const addEducation = require('./routes/student/education')
const addExperience = require('./routes/student/experience')
const addCareerObjective = require('./routes/student/addCareerObjective')
const addSkill = require('./routes/student/skill')


const updateProfile = require('./routes/student/updateProfile')
const updateCareerObjective = require('./routes/student/updateCareerObjective')
const updateExperience = require('./routes/student/experience')
const updateEducation = require('./routes/student/education')
const updateStudentContactDetails = require('./routes/student/updateStudentContactDetails')

const deleteEducation = require('./routes/student/education')
const deleteExperience = require('./routes/student/experience')
const deleteSkill = require('./routes/student/skill')

const getAllJobs = require('./routes/student/getAllJobs')
const getAllEvents = require('./routes/student/getAllEvents')

const applyToJob = require('./routes/student/applyToJob')
const applyToEvent = require('./routes/student/applyToEvent')

const appliedJobs = require('./routes/student/appliedJobs')
const appliedEvents = require('./routes/student/appliedEvents')

const companyDetails = require('./routes/student/companyDetails')

//company
const company = require("./routes/company/company")
const companyLogin = require("./routes/company/login")
const addEvent = require("./routes/company/addEvent")
const addJob = require("./routes/company/addJob")
const getEventsById = require("./routes/company/getEventsById")
const getJobsById = require("./routes/company/getJobsById")
const updateCompanyProfile = require("./routes/company/updateCompanyProfile")
const jobApplication = require("./routes/company/jobApplication")
const eventApplication = require("./routes/company/eventApplication")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(cookieParser());
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next();
});

app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://admin:' + process.env.Mongo_Atlas_PWD + '@cluster0-mgk28.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//common
app.use("/getStudents",getStudents)

//student
app.use("/studentSignup",student)
app.use("/StudentLogin",studentLogin)

app.use("/education",addEducation)
app.use("/experience",addExperience)
app.use("/addCareerobjective",addCareerObjective)
app.use("/skill",addSkill)

app.use("/updateProfile",updateProfile)
app.use("/updateCareerObjective",updateCareerObjective)
app.use("/education",updateEducation)
app.use("/experience",updateExperience)
app.use("/updateStudentContactDetails",updateStudentContactDetails)

app.use("/education",deleteEducation)
app.use("/experience",deleteExperience)
app.use("/skill",deleteSkill)

app.use("/appliedEvents",appliedEvents)
app.use("/appliedJobs",appliedJobs)

app.use("/applyToEvent",applyToEvent)
app.use("/applyToJob",applyToJob)

app.use("/getAllEvents",getAllEvents)
app.use("/getAllJobs",getAllJobs)

app.use("/companyDetails",companyDetails)





//company
app.use("/company",company)
app.use("/Clogin",companyLogin)

app.use("/updateCompanyProfile",updateCompanyProfile)

app.use("/addEvent",addEvent)
app.use("/addJob",addJob)

app.use("/getEventsById",getEventsById)
app.use("/getJobsById",getJobsById)

app.use("/jobApplication",jobApplication)
app.use("/eventApplication",eventApplication)




app.listen(process.env.port, () => { console.log('Server is running on port',process.env.port) });