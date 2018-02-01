var express = require('express');
var router = express.Router();
var Tasks =  require('./../server/Databases').Tasks;
var Activities = require('./../server/Databases.js').Activities;

var Task = function(dataModel){
    this.name = dataModel[0]
}

router.get('/',function(request,response){
  //List all from Database
  console.log("Download all Tasks request.");
  Tasks.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add task request: ");
  console.log(request.body);
  var t = new Task(request.body.inputs);
  Tasks.insert(t, function (err, newDoc) {
    console.log(newDoc);
    Activities.insert({message:newDoc.name+" was added",type:'taskAdd',link: newDoc._id}, function (err, newDoc) {
      console.log(newDoc);
    });
    response.send({message:"New task added",data:newDoc});
  });
});

router.post('/find',function(request,response){
    console.log("Finding one: "+request.body._id);
    Tasks.find({'_id':request.body._id}, function (err, docs) {
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
