var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../../config/settings');
var kafka = require('../../kafka/client');
const {auth} =require('../../config/passport') 
auth()

router.post('/', (req, res, next) => {

  kafka.make_request('PostCompanyLogin', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err || results == "Create Account First" || results == "Invalid Credentials") {
      if (results == "Create Account First") {
        console.log("Inside err");
        res.status(401).send("Create Account First");
      }
      else if (results == "Invalid Credentials") {
        console.log("Inside err");
        res.status(402).send("Invalid Credentials");
      }
      else {
        console.log("Inside err");
        res.status(500).send("Error");
      }
    } 
    else {
      console.log("Inside else");
      console.log(results);
      req.session.name = results.result;
      res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
      res.status(200).send({ message: "Success", data: results.result, token: results.token });
    }
  });
});

module.exports = router
