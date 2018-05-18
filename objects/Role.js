var express = require('express');
var router = express.Router();
var Roles =  require('./../server/Databases').Roles;
var Members =  require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;

var Role = function(dataModel){
    this.name = dataModel[0]+'';
    this.hashtags = dataModel[1]+'';
    this.description = dataModel[2]+'';
    this.image = dataModel[3].filter(Boolean);
    this.members = [dataModel[4].filter(Boolean)]
    this.messages = [];
    this.resources = [];
    this.label = this.name.toLowerCase();
    this.icon = ( (this.image.length!=0) ? this.image : 'public/images/demo/role.jpg' );
    this.org = '';
};

router.get('/',function(request,response){
  //List all from Dat   abase
  console.log("Download all Roles request.");
  Roles.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all org Roles request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Roles.find({org:linkedMember.defaultOrg},function(err,orgRoles){
            response.send(orgRoles);
        });
    });
});

router.post('/add',function(request,response){
  console.log("Add role request: ");
  console.log(request.body);
  var r = new Role(request.body.inputs);
  Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
      r.org = linkedMember.defaultOrg;
      Roles.insert(r, function (err, newDoc) {
        console.log(newDoc);
        linkedMember.roles.push(newDoc._id);
        linkedMember.save(function(err){});
        Activities.insert({message:newDoc.name+" was added",type:'roleAdd',link:newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id}, function (err, newDoc) {
          console.log(newDoc);
        });
        response.send({message:"New role added",data:newDoc});
      });
    });
});

router.post('/find',function(request,response){
    console.log("Finding one role: "+request.body._id);
    Roles.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Roles.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
