const Job = require("../models/job")

function handle_request(msg, callback) {
    console.log("message", msg)
    Job.update(
        { _id: msg._id },
        {
            $set: {
                "application.$[app].status": msg.status,
            }
        }, {
        arrayFilters: [{ "app._id": msg.appId }],
    }
    )
        .exec()
        .then(result => {
            console.log("first", result)
            callback(null, "success")
        })
        .catch(err => {
            console.log(err)
            callback(err, null)
        })
}

exports.handle_request = handle_request;