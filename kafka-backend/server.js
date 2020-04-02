var connection =  new require('./kafka/Connection');
var express = require('express');
var app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-mgk28.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//topics files
var student = require('./services/students');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running '+topic_name);
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("JSONSTRING",JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("PostStudentCreate",student)
