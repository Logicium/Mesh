//Name,Icon,Admin
var express = require('express');
var router = express.Router();
var Organizations = require('./../server/Databases').Orgs;
var Activities = require('./../server/Databases.js').Activities;
var Members = require('./../server/Databases.js').Members;

var Organization = function(dataModel){
    this.name = dataModel[0]+'';
    this.description = dataModel[1]+'';
    this.image = dataModel[2]+'';
    this.members = [];
    this.label = this.name;
    this.icon = this.image || 'public/images/demo/team.jpg';
    this.creator = '';
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
  console.log("Add org request: ");
  console.log(request.body);
  var o = new Organization(request.body.inputs);
  Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
      o.creator = linkedMember._id;
      Organizations.insert(o, function (err, newDoc) {
        console.log(newDoc);
        linkedMember.orgs.push(newDoc._id);
        linkedMember.save(function(err){});
        Activities.insert({message:newDoc.name+" was added",type:'orgAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id}, function (err, newDoc) {
          console.log(newDoc);
        });
        response.send({message:"New org added",data:newDoc});
      });
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Organizations.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Organizations.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
