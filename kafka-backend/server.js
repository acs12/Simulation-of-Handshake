var connection =  new require('./kafka/Connection');
var express = require('express');
var app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-mgk28.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//topics files
//common
var getStudents= require('./services/getStudents')
var getStudentsById = require('./services/getStudentById')

//Student
var student = require('./services/students');
var studentLogin = require('./services/studentLogin');
var addEducation = require('./services/addEducation')
var addExperience = require('./services/addExperience')
var addCareerObjective = require('./services/addCareerObjective')
var addSkill = require('./services/addSkill')
var updateStudentProfile = require('./services/updateStudentProfile')
var updateEducationDetails = require('./services/updateEducationDetails')
var updateExperienceDetails = require('./services/updateExperienceDetails')
var updateCareerObjective = require('./services/updateCareerObjective')
var updateStudentContactDetails = require('./services/updateStudentContactDetails')
var deleteEducation = require('./services/deleteEducation')
var deleteExperience = require('./services/deleteExperience')
var deleteSkill = require('./services/deleteSkill')
var getAllJobs = require('./services/getAllJobs')
var getAllEvents = require('./services/getAllEvents')
var appliedJobs = require('./services/appliedJobs')
var appliedEvents = require('./services/appliedEvents')
var applyToJob = require('./services/applyToJob')
var applyToEvent = require('./services/applyToEvent')
var companyDetails = require('./services/companyDetails')


//company
var company = require('./services/company');
var companyLogin = require('./services/companyLogin');
var updateCompanyProfile = require('./services/updateCompanyProfile');
var addJob = require('./services/addJob')
var addEvent = require('./services/addEvent')
var getJobsById = require('./services/getJobsById')
var getEventsById = require('./services/getEventsById')
var jobApplication = require('./services/jobApplication')
var eventApplication = require('./services/eventApplication')
var jobStatusUpdate = require('./services/jobStatusUpdate')

//company
var NewMessage = require('./services/newMessagePost')
var MessageFromCompany = require('./services/getCompanyMessages')




function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running '+topic_name);
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("JSONSTRING",JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

//student
handleTopicRequest("PostStudentCreate",student)
handleTopicRequest("PostStudentLogin",studentLogin)

handleTopicRequest("PostAddCareerObjective",addCareerObjective)
handleTopicRequest("PostAddSkill",addSkill)
handleTopicRequest("PostAddEducation",addEducation)
handleTopicRequest("PostAddExperience",addExperience)

handleTopicRequest("DeleteEducation",deleteEducation)
handleTopicRequest("DeleteExperience",deleteExperience)
handleTopicRequest("DeleteSkill",deleteSkill)

handleTopicRequest("UpdateEducationDetails",updateEducationDetails)
handleTopicRequest("UpdateExperienceDetails",updateExperienceDetails)
handleTopicRequest("UpdateCareerObjective",updateCareerObjective)
handleTopicRequest("UpdateStudentProfile",updateStudentProfile)
handleTopicRequest("UpdateStudentContactDetails",updateStudentContactDetails)

handleTopicRequest("GetAllJobs",getAllJobs)
handleTopicRequest("GetAllEvents",getAllEvents)

handleTopicRequest("ApplyToJob",applyToJob)
handleTopicRequest("ApplyToEvent",applyToEvent)

handleTopicRequest("AppliedJobs",appliedJobs)
handleTopicRequest("AppliedEvents",appliedEvents)

handleTopicRequest("CompanyDetails",companyDetails)


//company
handleTopicRequest("PostCompanyCreate",company)
handleTopicRequest("PostCompanyLogin",companyLogin)

handleTopicRequest("UpdateCompanyProfile",updateCompanyProfile)

handleTopicRequest("AddJob",addJob)
handleTopicRequest("AddEvent",addEvent)

handleTopicRequest("GetJobsById",getJobsById)
handleTopicRequest("GetEventsById",getEventsById)

handleTopicRequest("JobApplication",jobApplication)
handleTopicRequest("EventApplication",eventApplication)

handleTopicRequest("UpdateJobStatus",jobStatusUpdate)


//common
handleTopicRequest("GetStudents",getStudents)
handleTopicRequest("GetStudentsById",getStudentsById)

//message
handleTopicRequest("NewMessage",NewMessage)
handleTopicRequest("MessageFromCompany",MessageFromCompany)

