var express = require('express');
var router = express.Router();
var Roles =  require('./../server/Databases').Roles;
var Activities = require('./../server/Databases.js').Activities;

var Role = function(dataModel){
    this.name = dataModel[0]+'';
    this.hashtags = dataModel[1];
    this.description = dataModel[2];
    this.image = dataModel[3];
    this.members = [dataModel[4]]
    this.messages = [];
    this.resources = [];
    this.label = this.name.toLowerCase();
    this.icon = this.image  || 'public/images/demo/role.jpg';
};

router.get('/',function(request,response){
  //List all from Dat   abase
  console.log("Download all Projects request.");
  Roles.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add role request: ");
  console.log(request.body);
  var r = new Role(request.body.inputs);
  Roles.insert(r, function (err, newDoc) {
    console.log(newDoc);
    Activities.insert({message:newDoc.name+" was added",type:'roleAdd',link: newDoc._id}, function (err, newDoc) {
      console.log(newDoc);
    });
    response.send({message:"New role added",data:newDoc});
  });
});

router.post('/find',function(request,response){
    console.log("Finding one role: "+request.body._id);
    Roles.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
