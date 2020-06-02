const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

router.post('/', (req, res, next) => {

    console.log("Req Body", req.body)
    kafka.make_request('PostCompanyCreate', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err || results == "Account Exists") {
            if (results == "Account Exists") {
                console.log("Inside err");
                res.send("Account Exists");
            }
            else {
                console.log("Inside err");
                res.status(404).send("Error");
            }

        } else {
            console.log("Inside else");
            res.status(200).send("Success");
        }

    });
})

module.exports = router