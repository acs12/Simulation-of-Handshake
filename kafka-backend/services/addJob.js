const Job = require("../models/job")

function handle_request(msg, callback) {
    console.log("message", msg)
    const job = new Job({
        companyId: msg.companyId,
        title: msg.title,
        location: msg.location,
        postedDate: msg.postedDate,
        deadlineDate: msg.deadlineDate,
        salary: msg.salary,
        description: msg.description,
        category: msg.category
    });

    job.save()
        .then(result => {
            Job.find({
                companyId: msg.companyId
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