'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const Student = require('../models/students.js');
const Company = require('../models/company');
var { secret } = require('../config/settings');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use( "jwt",
        new JwtStrategy(opts, function (jwt_payload, callback) {
            const email = jwt_payload.email;
            Student.findOne({email : email}, (err, results) => {
                if (err) {
                    return callback(err, false)
                }
                if (results) {
                    callback(null, results)
                }
                else {
                    callback(null, false)
                }
            });
        })
    );
    passport.use( "company",
        new JwtStrategy(opts, function (jwt_payload, callback) {
            const email = jwt_payload.email;
            Company.findOne({email : email}, (err, results) => {
                if (err) {
                    return callback(err, false)
                }
                if (results) {
                    callback(null, results)
                }
                else {
                    callback(null, false)
                }
            });
        })
    );
};
exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
exports.checkAuthCompany = passport.authenticate("company", { session: false });