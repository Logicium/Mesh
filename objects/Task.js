var express = require('express');
var router = express.Router();
var Tasks =  require('./../server/Databases').Tasks;

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
  Tasks.insert(request.body, function (err, newDoc) {
    console.log(newDoc);
    response.send({message:"New task added",data:newDoc});
  });
});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
