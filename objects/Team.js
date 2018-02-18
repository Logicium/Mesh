var express = require('express');
var router = express.Router();
var Teams = require('./../server/Databases').Teams;
var Activities = require('./../server/Databases.js').Activities;
var Members = require('./../server/Databases.js').Members;

var Team = function(dataModel){
    this.name = dataModel[0]+'';
    this.description = dataModel[1]+'';
    this.image = dataModel[2]+'';
    this.members = dataModel[3];
    this.projects = dataModel[4]
    this.label = this.name;
    this.icon = this.image || 'public/images/demo/team.jpg';
    this.org = '';
}

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Teams request.");
  Teams.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all org Teams request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Teams.find({org:linkedMember.defaultOrg},function(err,orgTeams){
            response.send(orgTeams);
        });
    });
});

router.post('/add',function(request,response){
  console.log("Add team request: ");
  console.log(request.body);
  var t = new Team(request.body.inputs);
  Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
      t.org = linkedMember.defaultOrg;
      Teams.insert(t, function (err, newDoc) {
        console.log(newDoc);
        linkedMember.teams.push(newDoc._id);
        linkedMember.save(function(err){});
        Activities.insert({message:newDoc.name+" was added",type:'teamAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id}, function (err, newDoc) {
          console.log(newDoc);
        });
        response.send({message:"New team added",data:newDoc});
      });
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Teams.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Teams.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
