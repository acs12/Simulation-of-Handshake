const Event = require("../models/event")

function handle_request(msg, callback) {
    console.log("message", msg)

    Event.find(
        {
            application : {$nin: [msg.studentId]}
        }
    ).populate("companyId")
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