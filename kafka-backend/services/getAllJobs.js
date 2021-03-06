const Job = require("../models/job")

function handle_request(msg, callback) {
    console.log("message", msg)
    Job.find(
        {
            "application.studentId" : {$nin: [msg.studentId]}
        }
    ).populate("companyId").sort(msg.sort).exec()
        .then(result => {
            console.log("result",result)
            callback(null, result)
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;