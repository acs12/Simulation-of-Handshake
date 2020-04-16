var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function () {
    //Login
    it("Student should Login", function (done) {
        
        server
            .post("/StudentLogin")
            .send({
                schoolName: 'SFSU',
                email: 'aayush@gmail.com',
                password: 'abcd'
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })
            
    })

    it("Should Not Sign Up As Student Already Registered", function (done) {
        
        server
            .post("/studentSignup")
            .send({
                schoolName: 'SFSU',
                email: 'aayush@gmail.com',
                password: 'abcd'
            })    
            .expect(401)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(402);
                done();
            })
            
    })

    it("Should not login as student not registered.", function (done) {
        
        server
            .post("/StudentLogin")
            .send({
                schoolName: 'SFSU',
                email: 'aayus@gmail.com',
                password: 'abcd'
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(401);
                done();
            })
            
    })

    it("Should Not Signup as Already Registered.", function (done) {
        
        server
            .post("/studentSignup")
            .send({
                name : 'aayush',
                schoolName: 'SFSU',
                email: 'aayush@gmail.com',
                password: 'abcd'
            })    
            .expect(401)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(402);
                done();
            })
            
    })

    it("Company Should Signup ", function (done) {
        
        server
            .post("/company")
            .send({
                name : 'HP',
                location: 'San Francisco',
                email: 'hp@gmail.com',
                password: 'abcd'
            })    
            .expect(200)        
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            })
            
    })
})
