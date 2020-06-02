const Event = require("../models/event")

function handle_request(msg, callback) {
    console.log("message", msg)

    Event.find({
        _id: msg._id
    }
    ).populate('application')
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