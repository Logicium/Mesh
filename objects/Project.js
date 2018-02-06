var express = require('express');
var router = express.Router();
var Projects =  require('./../server/Databases').Projects;
var Activities = require('./../server/Databases.js').Activities;

var Project = function(dataModel){
    this.name = dataModel[0]+'';
    this.description = dataModel[1]+'';
    this.image = dataModel[2]+'';
    this.members = dataModel[3];
    this.roles = dataModel[4];
    this.tasks = [];
    this.events = [];
    this.messages = [];
    this.label = this.name+'';
    this.icon = this.image+''  || 'public/images/demo/project.jpg';
}

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Projects request.");
  Projects.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add project request: ");
  console.log(request.body);
  var p = new Project(request.body.inputs);
  Projects.insert(p, function (err, newDoc) {
    console.log(newDoc);
    Activities.insert({message:newDoc.name+" was added",type:'projectAdd',link: newDoc._id}, function (err, newDoc) {
      console.log(newDoc);
    });
    response.send({message:"New project added",data:newDoc});
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Projects.find({'_id':request.body._id}, function (err, docs) {
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
