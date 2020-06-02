const Student = require("../models/students")

function handle_request(msg, callback) {
    console.log("message", msg)
    Student.
        updateOne(
            {
                _id:msg._id
            },
            {
                $set:{
                    "experience.$[elem].companyName": msg.companyName,
                    "experience.$[elem].companyLocation": msg.companyLocation,
                    "experience.$[elem].title": msg.title,
                    "experience.$[elem].startDate": msg.startDate,
                    "experience.$[elem].endDate": msg.endDate,
                    "experience.$[elem].description": msg.description
                }
            },{ 
                arrayFilters: [{ "elem._id" : msg.id }],
              })
        .exec()
        .then(result => {
            Student.
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