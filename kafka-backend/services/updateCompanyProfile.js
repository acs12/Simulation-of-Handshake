const Company = require("../models/company")

function handle_request(msg, callback) {
    console.log("message", msg)
    Company.
        updateOne(
            {
                _id: msg._id
            },
            {
                $set: {
                    name: msg.name,
                    email: msg.email,
                    phoneNumber: msg.phoneNumber,
                    dateOfBirth: msg.established,
                    location: msg.location,
                    description: msg.description,
                    profilePicUrl: msg.profilePicUrl,
                }
            })
        .exec()
        .then(result => {
            Company.
                findOne({
                    _id: msg._id
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