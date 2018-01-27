var express = require('express');
var router = express.Router();
var Projects =  require('./../server/Databases').Projects;

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
  Projects.insert(request.body, function (err, newDoc) {
    console.log(newDoc);
    response.send({message:"New project added",data:newDoc});
  });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
