const Company = require("../models/company")
const bcrypt = require("bcrypt");

function handle_request(msg, callback) {
  console.log("message", msg)
  Company.
        findOne({
            email: msg.email,
        })
        .exec()
        .then((result,err) => {
            console.log("Error",err)
            console.log("Result", result)
            if (result !== null) {
                callback(null, "Account Exists")
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(msg.password, salt);
                const company = new Company({
                    name: msg.name,
                    email: msg.email,
                    password: password,
                    location : msg.location
                  });
                  company
                    .save()
                    .then(result => {
                      console.log("Company Added : ", result)
                      callback(null,result)
                    })
                    .catch(err => {
                      console.log(err)
                      callback(err,null)
                    })
                }
        })
        .catch(err => {
            console.log(err);
            callback(err, null);
        })
}
  

exports.handle_request = handle_request;