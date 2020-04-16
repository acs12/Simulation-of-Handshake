var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student =  require('../../models/students');
var jwt = require('jsonwebtoken');
const secret = require('../../config/settings')
const {auth} = require('../../config/passport')
// var passport = require('passport');
var config = require('../../config/settings');
var kafka = require('../../kafka/client');

auth()
// require('../../config/passport')(passport);

router.post('/',(req,res,next) => {
    
    kafka.make_request('PostStudentLogin',req.body, function(err,results){
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
      }else{
          auth()
          console.log("Inside else");
          console.log(results);
          req.session.name = results.result;   
          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});             
          res.status(200).send({message:"Success",data:results.result,token:results.token});                
          }      
  });
});

module.exports = router
