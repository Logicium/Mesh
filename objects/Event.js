var express = require('express');
var router = express.Router();
var Events =  require('./../server/Databases').Events;
var Activities = require('./../server/Databases.js').Activities;

var Event = function(dataModel){
    this.name = dataModel[0]+'';
    this.hosts = dataModel[1];
    this.guests = dataModel[2];
    this.description = dataModel[3];
    this.location = dataModel[4];
    this.startTime = dataModel[5];
    this.endTime = dataModel[6];
    this.image = dataModel[7];
    this.messages = [];
    this.label = this.name;
    this.icon = this.image;
};

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Events request.");
  Events.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add event request: ");
  console.log(request.body);
  var e = new Event(request.body.inputs);
  Events.insert(e, function (err, newDoc) {
    console.log(newDoc);
    Activities.insert({message:newDoc.name+" was added",type:'eventAdd',link: newDoc._id}, function (err, newDoc) {
      console.log(newDoc);
    });
    response.send({message:"New event added",data:newDoc});
  });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
