var express = require('express');
var router = express.Router();
var Tasks =  require('./../server/Databases').Tasks;
var Members =  require('./../server/Databases').Members;
var Activities = require('./../server/Databases.js').Activities;

var Task = function(dataModel){
    this.name = ( dataModel[0]+'' ? dataModel[0]+'' : 'Task Name' );
    this.description = ( dataModel[1]+'' ? dataModel[1]+'' : 'Task description' );
    this.members = dataModel[2].filter(Boolean);
    this.due = ( dataModel[3]+'' ? dataModel[3]+'' : new Date().setDate(new Date().getDate()+14) );
    this.reoccuring = dataModel[4]+'';
    this.org = '';
    this.creator = '';
}

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Tasks request.");
  Tasks.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/list',function(request,response){
    console.log("Download all org Teams request.");
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Tasks.find({org:linkedMember.defaultOrg},function(err,orgTasks){
            response.send(orgTasks);
        });
    });
});

router.post('/add',function(request,response){
  console.log("Add task request: ");
  console.log(request.body);
  var t = new Task(request.body.inputs);
  Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
      t.org = linkedMember.defaultOrg;
      t.creator = linkedMember._id;
      Tasks.insert(t, function (err, newDoc) {
        console.log(newDoc);
        linkedMember.tasks.push(newDoc._id);
        linkedMember.save(function(err){});
        Activities.insert({message:newDoc.name+" was added",type:'taskAdd',link: newDoc._id,org:linkedMember.defaultOrg,creator:linkedMember._id}, function (err, newDoc) {
          console.log(newDoc);
        });
        response.send({message:"New task added",data:newDoc});
      });
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Tasks.find({'_id':request.body._id}, function (err, docs) {
        response.send(docs);
    });
});

router.post('/update',function(request,response){
    console.log(request.body);
    var updateObject = request.body.objectData;
    var updateId = updateObject._id;
    Members.findOne({loginToken:request.body.token}, function (err, linkedMember) {
        Tasks.update({$and:[{_id:updateId},{org:linkedMember.defaultOrg}]},updateObject,{},function(err,doc){
            console.log(JSON.stringify(doc));
            response.send({message:'Successfully Updated',doc:doc});
        });
    });
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
