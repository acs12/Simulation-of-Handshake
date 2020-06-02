const Student = require("../models/students")

function handle_request(msg, callback) {
    console.log("message", msg)
    Student.
        updateOne(
            {
                _id: msg.studentId
            },
            {
                $set: {
                    email : msg.email,
                    phoneNumber : msg.phoneNumber
                }
            })
        .exec()
        .then(result => {
            Student.
                findOne({
                    _id: msg.studentId
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