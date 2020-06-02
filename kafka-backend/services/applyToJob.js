const Job = require("../models/job")
const Student = require("../models/students")

function handle_request(msg, callback) {
    console.log("message", msg)
    Job.update(
        { _id: msg._id },
        {
            $push: {
                application: {
                    studentId: msg.studentId,
                    status: msg.status,
                    applicationDate : msg.applicationDate
                }
            }
        }
    )
        .exec()
        .then(result => {
            console.log("first", result)
            Student.update({
                _id: msg.studentId
            }, {
                $set: {
                    resumeUrl: msg.myImage
                }
            })
                .exec()
                .then(result => {
                    Job.find(
                        {
                            "application.studentId": { $nin: [msg.studentId] }
                        }
                    ).populate("companyId")
                        .then(result => {
                            console.log("result", result)
                            callback(null, result)
                        })
                        .catch(err => {
                            console.log(err)
                            callback(err, null)
                        })
                })
                .catch(err => {
                    console.log(err)
                    callback(err, null)
                })
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;