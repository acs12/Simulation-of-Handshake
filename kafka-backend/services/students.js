const Student = require("../models/students")
const bcrypt = require("bcrypt");

function handle_request(msg, callback) {
  console.log("message", msg)

  Student.
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
                const student = new Student({
                  name: msg.name,
                  email: msg.email,
                  schoolName: msg.schoolName,
                  password: password,
                });
                student
                  .save()
                  .then(result => {
                    console.log("Student Added : ", result)
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