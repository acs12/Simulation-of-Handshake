const {auth,checkAuth} =require('../../config/passport') 
const express = require('express');
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var kafka = require('../../kafka/client');
auth();

router.post('/',checkAuth,(req, res, next) => {

    console.log("Req Body",checkAuth, req.body)
    kafka.make_request('GetAllJobs', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.status(404).send("Error");
        } else {
            console.log("Inside else");
            res.status(200).send(results);
        }

    });
})

module.exports = router