const Student = require("../models/students")
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var passport = require('passport');
require('../config/passport')(passport);
const bcrypt = require("bcrypt");



function handle_request(msg, callback) {

    console.log(msg);
    Student.
        findOne({
            email: msg.email
        })
        .exec()
        .then((result) => {
            console.log("Result", result)
            if (result !== null) {
                if (msg.schoolName === result.schoolName) {
                    console.log(bcrypt.compareSync(msg.password, result.password))
                    if (bcrypt.compareSync(msg.password, result.password)) {
                        var token = jwt.sign({ email: msg.email }, config.secret, {
                            expiresIn: 100800 // in seconds
                        });
                        callback(null, { result, token: "JWT" + token });
                    }
                    else {
                        callback(null, "Invalid Credentials")
                    }
                }
                else{
                    callback(null, "Invalid Credentials")
                }
            }
            else {
                callback(null, "Create Account First")
            }
        })
        .catch(err => {
            console.log(err);
            callback(err, null);
        })
}

exports.handle_request = handle_request;