const Event = require("../models/event")

function handle_request(msg, callback) {
    console.log("message", msg)
    const event = new Event({
        companyId: msg.companyId,
        name: msg.name,
        date: msg.date,
        time: msg.time,
        description: msg.description,
        location: msg.location,
        eligibility: msg.eligibility,
    });

    event.save()
        .then(result => {
            Event.find({
                companyId:msg.companyId
            })
                .exec()
                .then(result => {
                    console.log(result);
                    callback(null, result);
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