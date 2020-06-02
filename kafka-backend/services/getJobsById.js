const Job = require("../models/job")

function handle_request(msg, callback) {
    console.log("message", msg)

    Job.find(
        {
            companyId :msg.companyId
        }
    ).populate('application.studentId')
        .then(result => {
            console.log(result)
            callback(null, result)
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;