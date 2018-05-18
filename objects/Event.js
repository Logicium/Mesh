var express = require('express');
var router = express.Router();
var Events =  require('./../server/Databases').Events;
var Members =  require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;

var Event = function(dataModel){
    this.name = dataModel[0]+'';
    this.hosts = dataModel[1].filter(Boolean);
    this.guests = dataModel[2].filter(Boolean);
    this.description = dataModel[3]+'';
    this.location = dataModel[4]+'';
    this.startTime = dataModel[5]+'';
    this.endTime = dataModel[6]+'';
    this.image = dataModel[7]+'';
    this.messages = [];
    this.label = this.name;
    this.icon = ( (this.image.length!=0) ? this.image : 'public/images/demo/event.jpg' );
    this.org = '';
};

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Events request.");
  Events.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all org Events request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Events.find({org:linkedMember.defaultOrg},function(err,orgEvents){
            response.send(orgEvents);
        });
    });
});

router.post('/add',function(request,response){
    console.log("Add event request: ");
    console.log(request.body);
    var e = new Event(request.body.inputs);
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        e.org = linkedMember.defaultOrg;
        Events.insert(e, function (err, newDoc) {
            console.log(newDoc);
            linkedMember.events.push(newDoc._id);
            linkedMember.save(function(err){});
            Activities.insert({message:newDoc.name+" was added",type:'eventAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id}, function (err, newDoc) {
              console.log(newDoc);
            });
            response.send({message:"New event added",data:newDoc});
        });
    });
});

router.post('/find',function(request,response){
    console.log("Finding one event: "+request.body._id);
    Events.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Events.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
