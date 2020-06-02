const Student = require("../models/students")

function handle_request(msg, callback) {
    console.log("message", msg)
    Student.
        updateOne(
            {
                _id: msg._id,
            },
            {
                $set: {
                    "education.$[elem].collegeName": msg.collegeName,
                    "education.$[elem].educationLocation": msg.educationLocation,
                    "education.$[elem].degree": msg.degree,
                    "education.$[elem].major": msg.major,
                    "education.$[elem].yearOfPassing" : msg.yearOfPassing,
                    "education.$[elem].cgpa": msg.cgpa
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