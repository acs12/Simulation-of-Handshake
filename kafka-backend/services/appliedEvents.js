const Event = require("../models/event")

function handle_request(msg, callback) {
    console.log("message", msg)
    var ID = msg.studentId
    console.log(ID)
    Event.find(
        {
            application : { $in : [msg.studentId] }

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