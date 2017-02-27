var express = require('express');
var router = express.Router();
var LinvoDB = require("linvodb3");
LinvoDB.dbPath = process.cwd();
var Events = new LinvoDB("events",{});

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
  Events.insert(request.body, function (err, newDoc) {
    console.log(newDoc);
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