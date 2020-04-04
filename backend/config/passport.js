'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const Student = require('../models/students.js');
var config = require('../config/settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, callback) {
            Student.findOne({ email: jwt_payload.email }, function (res) {
                var Student = res;
                callback(null, Student);
            }, function (err) {
                return callback(err, false);
            });
        }));
};

// exports.auth = auth
// exports.checkAuth = passport.authenticate("jwt",{session:false});