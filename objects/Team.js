var express = require('express');
var router = express.Router();
var Teams = require('./../server/Databases').Teams;
var Activities = require('./../server/Databases.js').Activities;

var Team = function(dataModel){
    this.name = dataModel[0]+'';
    this.description = dataModel[1];
    this.image = dataModel[2];
    this.members = [dataModel[3]];
    this.projects = [dataModel[4]]
    this.label = this.name;
    this.icon = this.image || 'public/images/demo/team.jpg';
}

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Teams request.");
  Teams.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add team request: ");
  console.log(request.body);
  var t = new Team(request.body.inputs);
  Teams.insert(t, function (err, newDoc) {
    console.log(newDoc);
    Activities.insert({message:newDoc.name+" was added",type:'teamAdd',link: newDoc._id}, function (err, newDoc) {
      console.log(newDoc);
    });
    response.send({message:"New team added",data:newDoc});
  });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
