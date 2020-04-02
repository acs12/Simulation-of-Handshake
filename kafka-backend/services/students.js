const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require("../models/students")



function handle_request(msg, callback) {
  console.log("message", msg)
  const student = new Student({
    name: msg.name,
    email: msg.email,
    schoolName: msg.schoolName,
    password: msg.password,
  });
  student
    .save()
    .then(result => {
      console.log("Student Added : ", result)
      callback(null,result)
      // res.status(200).json({
      //   message: "Handling Add Student Post Request",
      //   student: result
      // })

    })
    .catch(err => {
      console.log(err)
      callback(err,null)
    //   res.status(400).json({
    //     message: err
    //   })
    })

}

exports.handle_request = handle_request;